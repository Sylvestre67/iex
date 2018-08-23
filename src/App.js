import React, {Component} from 'react';
import {MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import grey from '@material-ui/core/colors/grey';

import {darkTheme, lightTheme} from "./theme/Theme";

import NavBar from './components/NavBar';

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
        flexGrow: 1,
        overflow: 'scroll'
    }
});


class App extends Component {

    constructor(props) {
        super(props);

        this.toggleTheme = this.toggleTheme.bind(this);

        this.state = {
            theme: lightTheme,
            checked: []
        }
    }

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

    render() {
        const {classes} = this.props;
        const {theme} = this.state;
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

                            </Paper>
                        </Grid>

                        <Grid item xs={6} className={classes.flex}>
                            <Paper square elevation={0} className={classes.grow}>

                            </Paper>
                        </Grid>

                        <Grid item xs={3} className={classes.flex}>
                            <Paper square elevation={0} className={classes.grow}>

                            </Paper>
                        </Grid>
                    </Grid>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default withStyles(styles)(App);
