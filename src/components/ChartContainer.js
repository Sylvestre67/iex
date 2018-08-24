import React, {Component} from 'react';
import axios from 'axios';

import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import grey from '@material-ui/core/colors/grey';

import {lineChart} from '../charts/charts';

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
    }
});

class ChartContainer extends Component {

    componentDidMount() {
        const {symbol} = this.props;
        const {element} = this;

        if (symbol) {
            axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/chart/dynamic`)
                .then(function (stocks) {
                    lineChart(element, stocks.data);
                });
        }
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        const {symbol} = this.props;
        const {element} = this;

        if (prevProps.symbol !== symbol) {
            axios.get(`https://api.iextrading.com/1.0/stock/${symbol}/chart/dynamic`)
                .then(function (stocks) {

                    window.addEventListener('resize', () => {
                        lineChart(element, stocks.data);
                    }, false);

                    lineChart(element, stocks.data);
                });
        }
    }

    componentWillUnmount() {
        const {stocks} = this.state;
        const {element} = this;

        window.removeEventListener('resize', () => {
            lineChart(element, stocks.data);
        });
    }

    render() {
        const {symbol, classes} = this.props;
        return (
            <React.Fragment>
                <AppBar position="static"
                        elevation={0}
                        color='default'>
                    <Toolbar>
                        <Typography variant='subheading'>Chart - {symbol}</Typography>
                    </Toolbar>
                </AppBar>
                <div className={[classes.grow, classes.lineChart].join(' ')} ref={element => this.element = element}/>
            </React.Fragment>

        );
    }
}

ChartContainer.propTypes = {};
ChartContainer.defaultProps = {};

export default withStyles(styles)(ChartContainer);
