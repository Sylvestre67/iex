import React, {Component} from 'react';
import {MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';

import grey from '@material-ui/core/colors/grey';

import {darkTheme, lightTheme} from "./theme/Theme";

const styles = theme => ({
    root: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        display: 'flex',

        backgroundColor: grey[700],
        padding: theme.spacing.unit * 2
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
        this.state = {
            theme: darkTheme,
            checked: []
        }
    }

    handleToggle() {
    }

    render() {
        const {classes} = this.props;
        const {theme} = this.state;
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline/>
                <div className={classes.root}>
                    <Grid container
                          spacing={16}
                          style={{flexWrap: 'nowrap'}}
                          alignItems="stretch">
                        <Grid item
                              className={classes.flex}
                              xs={3}>
                            <Paper square elevation={0} className={classes.grow}>
                                <List>
                                    {[0, 1, 2, 3].map(value => (
                                        <ListItem
                                            key={value}
                                            role={undefined}
                                            dense
                                            button
                                            onClick={this.handleToggle(value)}
                                            className={classes.listItem}
                                        >
                                            <Checkbox
                                                checked={this.state.checked.indexOf(value) !== -1}
                                                tabIndex={-1}
                                                disableRipple
                                            />
                                            <ListItemText primary={`Line item ${value + 1}`}/>
                                            <ListItemSecondaryAction>
                                                <IconButton aria-label="Comments">
                                                    <CommentIcon/>
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))}
                                </List>
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
