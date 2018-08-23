import React, {Component} from 'react';
import {MuiThemeProvider, withStyles} from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import grey from '@material-ui/core/colors/grey';

import {darkTheme, lightTheme} from "./theme/Theme";

import withSocketManager from './components/withSocketManager';
import NavBar from './components/NavBar';
import Stock from './components/Stock';
import ChartContainer from './components/ChartContainer';

// const quote = {
//     "symbol":"FB",
//     "sector":"softwareservices",
//     "securityType":"commonstock",
//     "bidPrice":174.4100,
//     "bidSize":200,
//     "askPrice":175.5000,
//     "askSize":100,
//     "lastUpdated":1535040093785,
//     "lastSalePrice":174.3800,
//     "lastSaleSize":100,
//     "lastSaleTime":1535040071437,
//     "volume":371342,
//     "marketPercent":0.03796,
//     "seq":81004
// };

const styles = theme => ({
    root: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        display: 'flex',
        padding: theme.spacing.unit * 2,
        paddingTop:theme.spacing.unit * 8
    },
    light:{
        backgroundColor: grey[400]
    },
    dark:{
        backgroundColor: grey[700]
    },
    flex: {
        display: 'flex',
        flexDirection: 'column'
    },
    grow: {
        position:'relative',
        flexGrow: 1,
        overflow: 'scroll'
    }
});


class App extends Component {

    constructor(props) {
        super(props);

        this.toggleTheme = this.toggleTheme.bind(this);
        this.updateActiveSymbol = this.updateActiveSymbol.bind(this);

        this.state = {
            theme: lightTheme,
            activeSymbol: Object.keys(props.quotes)[0]
        };
    }

    updateActiveSymbol(symbol){
        this.setState({activeSymbol : symbol});
    };

    toggleTheme(){
        const {theme} = this.state;
        if(theme === lightTheme){
            return this.setState({
                theme: darkTheme
            });
        }

        return this.setState({
            theme: lightTheme
        });
    }

    renderWatchList(){
        const {quotes} = this.props;

        return Object.keys(quotes).map(sym => {
            const quote = quotes[sym][quotes[sym].length - 1];

            return (quote) ? <Stock key={sym} {...quote} onClick={this.updateActiveSymbol}/> : null;
        });
    }

    render() {
        const {classes} = this.props;
        const {theme, activeSymbol} = this.state;

        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline/>

                <NavBar toggleTheme={this.toggleTheme} theme={theme} />

                <div className={ [classes.root, (theme === lightTheme) ? classes.light : classes.dark].join(' ')}>
                    <Grid container
                          spacing={16}
                          style={{flexWrap: 'nowrap'}}
                          alignItems="stretch">
                        <Grid item
                              className={classes.flex}
                              xs={3}>
                            <Paper square elevation={0} className={classes.grow}>
                                <AppBar position="static"
                                        elevation={0}
                                        color='default'>
                                    <Toolbar>
                                        <Typography variant='subheading'>Watch List</Typography>
                                    </Toolbar>
                                </AppBar>
                               {this.renderWatchList()}
                            </Paper>
                        </Grid>

                        <Grid item xs={6} className={classes.flex}>
                            <Paper square elevation={0} className={classes.grow}>
                                <ChartContainer symbol={activeSymbol} />
                            </Paper>
                        </Grid>

                        <Grid item xs={3} className={classes.flex}>
                            <Paper square elevation={0} className={classes.grow}>
                                <AppBar position="static"
                                        elevation={0}
                                        color='default'>
                                    <Toolbar>
                                        <Typography variant='subheading'>News Feed</Typography>
                                    </Toolbar>
                                </AppBar>
                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(withSocketManager(App));
