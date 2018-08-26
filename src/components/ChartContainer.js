import React, {Component} from 'react';

import {withStyles} from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import grey from '@material-ui/core/colors/grey';

import DynamicLineChart from './DynamicLineChart';
import LineChart from './LineChart';

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

class ChartContainer extends Component {

    constructor(props) {
        super(props);

        this.handleTabChange = this.handleTabChange.bind(this);

        this.state = {
            activeTab: 0
        }
    }

    handleTabChange(event, value) {
        this.setState({activeTab: value});
    }

    renderChartComponent() {
        const {activeTab} = this.state;

        if (activeTab === 1) {
            return <LineChart {...this.props} />
        }

        return <DynamicLineChart {...this.props} />
    }

    render() {
        const {symbol} = this.props;
        const {activeTab} = this.state;
        return (
            <React.Fragment>
                <AppBar position="static"
                        elevation={0}
                        color='default'>
                    <Tabs
                        value={activeTab}
                        indicatorColor="secondary"
                        textColor="primary"
                        onChange={this.handleTabChange}>
                        <Tab label={`${symbol} dynamic`}/>
                        <Tab label={`${symbol} Historic`}/>
                    </Tabs>
                </AppBar>

                {this.renderChartComponent()}
            </React.Fragment>

        );
    }
}

ChartContainer.propTypes = {};
ChartContainer.defaultProps = {};

export default withStyles(styles)(ChartContainer);
