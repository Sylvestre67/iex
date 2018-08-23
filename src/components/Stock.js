import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
    root: {
        display:'flex',
        marginBottom: theme.spacing.unit * .5,
        borderTop: `1px solid ${grey[200]}`,
        borderBottom: `1px solid ${grey[200]}`,
        minHeight: theme.spacing.unit * 6,

    },
    symbol:{
        flex:'1 0 auto',
        display:'flex',
        alignItems:'center',
        padding: `0 ${theme.spacing.unit}px`
    },
    lsp:{
        display:'flex',
        backgroundColor:grey[400],
        alignItems:'center',
        padding: `0 ${theme.spacing.unit}px`
    }
});

function Stock(props) {
    const {classes, symbol, lastSalePrice, seq} = props;
    return (
        <div className={classes.root}>
            <div className={classes.symbol}>
                <div>
                    <Typography>{symbol}</Typography>
                    <Typography variant='caption'>{numeral(seq).format('0,0')}</Typography>
                </div>
            </div>
            <div className={classes.lsp}>
                <Typography>$ {numeral(lastSalePrice).format('0,0.00')}</Typography>
            </div>
        </div>
    );
}

Stock.propTypes = {
    symbol: PropTypes.string,
    sector: PropTypes.string,
    securityType: PropTypes.string,
    bidPrice: PropTypes.number,
    bidSize: PropTypes.number,
    askPrice: PropTypes.number,
    askSize: PropTypes.number,
    lastUpdated: PropTypes.number,
    lastSalePrice: PropTypes.number,
    lastSaleSize: PropTypes.number,
    lastSaleTime: PropTypes.number,
    volume: PropTypes.number,
    marketPercent: PropTypes.number,
    seq: PropTypes.number,
};
Stock.defaultProps = {};

export default withStyles(styles)(Stock);
