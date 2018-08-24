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
        error: {
            light: '#ff8982',
            main: '#ff5555',
            dark: '#c5162c'
        },
    },
    typography: {
        fontFamily: defaultFontFamily,
    },
});
