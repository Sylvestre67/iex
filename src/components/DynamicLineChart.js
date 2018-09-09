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
            range: 'dynamic'
        }
    }

    componentDidMount() {
        const {symbol} = this.props;
        if (symbol) {
            this.fetchData();
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const {symbol} = this.props;
        const {range, polling} = this.state;
        const {element} = this;

        if (symbol !== prevProps.symbol || range !== prevState.range) {
            element.innerHTML = '';
            clearInterval(polling);
            this.fetchData();
        }
    }

    componentWillUnmount() {
        const {stocks, polling} = this.state;
        const {element} = this;

        clearInterval(polling);

        window.removeEventListener('resize', () => {
            element.innerHTML = '';
            dynamicLineChart(element, stocks.data);
        }, false);
    }


    fetchData() {
        const {symbol} = this.props;
        const {range} = this.state;

        const {element} = this;

        axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/chart/${range}`)
            .then((stocks) => {
                // If market is closed render the last day chart.
                if (stocks.data.range && stocks.data.range !== 'today') {
                    this.setState({range: '1d'});
                } else {
                    const dataset = (stocks.data.range) ? stocks.data.data : stocks.data;
                    dynamicLineChart(element, dataset);

                    window.addEventListener('resize', () => {
                        element.innerHTML = '';
                        dynamicLineChart(element, dataset);
                    }, false);
                }
            })
            .catch((err) => {
                console.log(err)
            });

        const polling = window.setInterval(() => {
            axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/chart/${range}`)
                .then(function (stocks) {
                    const dataset = (stocks.data.range) ? stocks.data.data : stocks.data;
                    dynamicLineChart(element, dataset);

                    // Checking if the dataset is complete.
                    if (dataset > 389) {
                        console.log('clearing');
                        clearInterval(polling);
                    }
                })
                .catch((err) => {
                    console.log(err)
                });
        }, 60 * 1000);

        // Adding the polling to the state, to enable clearInterval on CDU lifecycle if condition met.
        this.setState({polling})
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

                <div className={classes.legendLabel}
                     style={{textAlign: 'right', marginTop: '-16px', overflow: 'hidden'}}>
                    <Typography variant='caption'>Time</Typography>
                </div>
            </React.Fragment>
        );
    }
}

DynamicLineChart.propTypes = {};
DynamicLineChart.defaultProps = {};

export default withStyles(styles)(DynamicLineChart);
