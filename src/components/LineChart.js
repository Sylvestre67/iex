import React, {Component} from 'react';
import axios from 'axios';

import {withStyles} from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';

import {lineChart} from '../charts/charts';

import grey from "@material-ui/core/colors/grey";

const styles = theme => ({
        grow: {
            flexGrow: 1
        },
        lineChart: {
            '& svg.line-chart': {
                '& .axis': {
                    '& path, & line': {
                        stroke: grey[400]
                    },
                    ' & text': {
                        fill: grey[600]
                    }
                }
            }
        },
        formControl: {
            margin: theme.spacing.unit
        },
        group: {
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
        legendLabel: {
            margin: theme.spacing.unit
        }
    }
);

class LineChart extends Component {

    constructor(props) {
        super(props);

        this.handleDateRangeChange = this.handleDateRangeChange.bind(this);

        this.state = {
            range: 'ytd'
        }
    }

    componentDidMount() {
        const {symbol} = this.props;
        if (symbol) {
            this.fetchData();
        }
    }

    componentWillUnmount() {
        const {stocks} = this.state;
        const {element} = this;

        window.removeEventListener('resize', () => {
            lineChart(element, stocks.data);
        });
    }

    handleDateRangeChange(event) {
        this.setState({range: event.target.value}, () => {
            this.fetchData();
        });
    }

    fetchData() {
        const {symbol} = this.props;
        const {range} = this.state;

        const {element} = this;

        return axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/chart/${range}`)
            .then(function (stocks) {

                window.addEventListener('resize', () => {
                    lineChart(element, stocks.data);
                }, false);

                lineChart(element, stocks.data);
            });
    }

    renderDateRangeControl() {
        const dateRange = ['1m', '3m', '6m', 'ytd', '1y', '2y'];
        const {classes} = this.props;
        const {range} = this.state;

        return <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Date Range</FormLabel>
            <RadioGroup
                aria-label="Gender"
                name="gender1"
                className={classes.group}
                value={range}
                onChange={this.handleDateRangeChange}>

                {dateRange.map((range) => {
                    return <FormControlLabel value={range}
                                             key={range}
                                             label={range}
                                             control={<Radio/>}/>

                })}

            </RadioGroup>
        </FormControl>
    }

    render() {
        const {classes} = this.props;

        return (<React.Fragment>
            {this.renderDateRangeControl()}

            <div className={classes.legendLabel} style={{marginBottom: '-8px'}}>
                <Typography variant='caption'>Close Price ($)</Typography>
            </div>

            <div className={[classes.grow, classes.lineChart].join(' ')}
                 ref={element => this.element = element}/>
            <div className={classes.legendLabel} style={{textAlign: 'right', marginTop: '-16px'}}>
                <Typography variant='caption'>Time</Typography>
            </div>
        </React.Fragment>);
    }
}

LineChart.propTypes = {};
LineChart.defaultProps = {};

export default withStyles(styles)(LineChart);
