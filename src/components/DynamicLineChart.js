import React, {Component} from 'react';
import axios from "axios/index";

import {withStyles} from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import grey from "@material-ui/core/colors/grey";

import {dynamicLineChart} from '../charts/charts';

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

class DynamicLineChart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            range: '1d'
        }
    }

    componentDidMount() {
        const {symbol} = this.props;
        if (symbol) {
            this.fetchData();
        }
    }

    fetchData() {
        const {symbol} = this.props;
        const {range} = this.state;

        const {element} = this;

        return axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/chart/${range}`)
            .then(function (stocks) {

                window.addEventListener('resize', () => {
                    dynamicLineChart(element, stocks.data);
                }, false);

                dynamicLineChart(element, stocks.data);
            });
    }

    render() {

        const {classes} = this.props;

        return (
            <React.Fragment>
                <div className={classes.legendLabel} style={{marginBottom: '-8px'}}>
                    <Typography variant='caption'>Close Price ($)</Typography>
                </div>

                <div className={[classes.grow, classes.lineChart].join(' ')}
                     ref={element => this.element = element}/>

                <div className={classes.legendLabel} style={{textAlign: 'right', marginTop: '-16px'}}>
                    <Typography variant='caption'>Time</Typography>
                </div>
            </React.Fragment>
        );
    }
}

DynamicLineChart.propTypes = {};
DynamicLineChart.defaultProps = {};

export default withStyles(styles)(DynamicLineChart);
