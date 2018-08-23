import React from 'react';
import ReactDOM from 'react-dom';

import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';

import grey from '@material-ui/core/colors/grey';

const styles = theme => {
    let root;
    const styles = {
        root:{},
        flex:{
            display:'flex'
        },
        grow:{
            flexGrow:1
        }
    };

    if (theme.palette.type === 'light') {
        root = {
            root: {
                backgroundColor:'white',
                color:grey[800]
            },
        }
    } else{
        root = {
            root: {
                backgroundColor:grey[800],
                color:'white'
            }
        }
    }

    return Object.assign(styles, root)

};

function NavBar(props) {
    const {classes, theme} = props;

    return ReactDOM.createPortal(
        (<AppBar position="fixed"
                 elevation={0}
                 className={classes.root}>
            <Toolbar variant="dense" className={classes.flex}>
                <Typography variant="title"
                            color="inherit"
                            className={classes.grow}>
                    Stats
                </Typography>
                <div>
                    <Switch checked={theme.palette.type === 'light'}
                            onChange={props.toggleTheme}
                            value="theme"
                            color="primary"/>
                </div>
            </Toolbar>
        </AppBar>),
        document.querySelector('#navbar')
    );
}

NavBar.propTypes = {};
NavBar.defaultProps = {};

export default withStyles(styles)(NavBar);
