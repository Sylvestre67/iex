import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import {lineChart} from '../charts/charts';

class ChartContainer extends Component {

    componentDidMount() {
        const {symbol} = this.props;
        const {element} = this;

        fetch(`https://api.iextrading.com/1.0/stock/${symbol}/chart/dynamic`)
            .then(function(response) {
                return response.json();
            })
            .then(function(json) {
                console.log(JSON.stringify(json));
                lineChart(element, json.data);
            });
    }

    componentDidUpdate(prevProps, prevState, prevContext) {
        const {symbol} = this.props;
        const {element} = this;

        if(prevProps.symbol !== symbol) {
            fetch(`https://api.iextrading.com/1.0/stock/${symbol}/chart/dynamic`)
                .then(function(response) {
                    return response.json();
                })
                .then(function(json) {
                    console.log(JSON.stringify(json));
                    lineChart(element, json.data);
                });
        }
    }


    render() {
        const {symbol} = this.props;
        return (
            <div>
                <AppBar position="static"
                        elevation={0}
                        color='default'>
                    <Toolbar>
                        <Typography variant='subheading'>Chart - {symbol}</Typography>
                    </Toolbar>
                </AppBar>
                <div ref={element => this.element = element}></div>
            </div>
        );
    }
}

ChartContainer.propTypes = {};
ChartContainer.defaultProps = {};

export default ChartContainer;
