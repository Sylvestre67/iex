import React, {Component} from 'react';
import {MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import axios from 'axios';
import numeral from 'numeral';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import grey from '@material-ui/core/colors/grey';

import {darkTheme, lightTheme} from "./theme/Theme";

import withSocketManager from './components/withSocketManager';
import NavBar from './components/NavBar';
import ChartContainer from './components/ChartContainer';

const styles = theme => ({
    root: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        display: 'flex',
        padding: theme.spacing.unit * 2,
        paddingTop: theme.spacing.unit * 8
    },
    light: {
        backgroundColor: grey[400]
    },
    dark: {
        backgroundColor: grey[700]
    },
    flex: {
        display: 'flex',
        flexDirection: 'column'
    },
    grow: {
        position: 'relative',
        flexGrow: 1,
        overflow: 'scroll'
    },
    negative: {
        '& span': {
            color: theme.palette.error.main
        }
    },
    positive: {
        '& span': {
            color: '#00a478'
        }
    },
    active: {
        borderLeft: '5px solid #0d9da8'
    }
});

const stockList = ['FB', 'AAPL', 'GOOGL', 'SNAP', 'ALTABA', 'MSFT', 'SPOT', 'DPX', 'DOCU', 'AMZN'];

class App extends Component {

    constructor(props) {
        super(props);

        this.toggleTheme = this.toggleTheme.bind(this);
        this.updateActiveSymbol = this.updateActiveSymbol.bind(this);
        this.updateStock = this.updateStock.bind(this);

        this.state = {
            theme: lightTheme,
            activeSymbol: stockList[0]
        };
    }

    componentDidMount() {
        const url = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${stockList.join(',')}&types=quote,news,chart&range=1m&last=1`
        const {connectToSocket, subscribeToNewQuote} = this.props;

        axios.get(url)
            .catch((err) => {
                console.log(err);
            })
            .then(stocks => {
                this.setState({
                    stocks: stocks.data
                });

                this.socket = connectToSocket();
                subscribeToNewQuote(this.socket, (msg) => this.updateStock(msg));

            });
    }

    updateStock(quote) {
        const {stocks} = this.state;
        const {symbol} = quote;

        if (stocks[symbol]) {
            const stocks_quote = stocks[symbol].quote;
            stocks[symbol].quote = Object.assign(stocks_quote, quote);
            this.setState({stocks});
        }
    }

    updateActiveSymbol(symbol) {
        this.setState({activeSymbol: symbol});
    };

    toggleTheme() {
        const {theme} = this.state;
        if (theme === lightTheme) {
            return this.setState({
                theme: darkTheme
            });
        }

        return this.setState({
            theme: lightTheme
        });
    }

    renderWatchList() {
        const {classes} = this.props;
        const {stocks, activeSymbol} = this.state;

        if (stocks) {
            return <List dense>
                <Divider/>
                {Object.keys(stocks).map(sym => {
                    const quote = stocks[sym].quote;
                    const percent = (quote.marketPercent) ? quote.marketPercent : quote.changePercent;

                    return <React.Fragment key={sym}>
                        <ListItem className={(sym === activeSymbol) ? classes.active : ''} button
                                  onClick={() => this.updateActiveSymbol(sym)}>
                            <ListItemText
                                primary={sym}
                                secondary={`$ ${numeral(quote.latestPrice).format('0,000.00')}`}
                            />
                            <ListItemText
                                className={
                                    (percent < 0)
                                        ? classes.negative
                                        : classes.positive
                                }
                                style={{textAlign: 'right'}}
                                primary={numeral(percent).format('0.00%')}
                                secondary={quote.calculationPrice}
                            />
                        </ListItem>
                        <Divider/>
                    </React.Fragment>
                })}
            </List>
        }

        return null;
    }

    render() {
        const {classes} = this.props;
        const {theme, activeSymbol, stocks} = this.state;

        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline/>

                <NavBar toggleTheme={this.toggleTheme} theme={theme}/>

                <div className={[classes.root, (theme === lightTheme) ? classes.light : classes.dark].join(' ')}>
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

                        <Grid item xs={9} className={classes.flex}>
                            <Paper square elevation={0}
                                   className={[classes.grow, classes.flex].join(' ')}>
                                <ChartContainer symbol={activeSymbol}/>
                            </Paper>
                        </Grid>

                    </Grid>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(withSocketManager(App));
