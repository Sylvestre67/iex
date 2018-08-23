import {createMuiTheme} from '@material-ui/core/styles';

const defaultFontFamily = ['Muli', 'sans-serif'].join(',');

export const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
    typography: {
        fontFamily: defaultFontFamily,
    },
});

export const lightTheme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#0d9da8',
        },
        secondary: {
            main: '#ffa200',
        },
    },
    typography: {
        fontFamily: defaultFontFamily,
    },
});
