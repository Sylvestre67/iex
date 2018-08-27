import {createMuiTheme} from '@material-ui/core/styles';

const defaultFontFamily = ['Muli', 'sans-serif'].join(',');

export const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            light: '#ffb433',
            main: '#ffa200',
            dark: '#b27100'
        },
        secondary: {
            light: '#3db0b9',
            main: '#0d9da8',
            dark: '#096d75'
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

export const lightTheme = createMuiTheme({
    palette: {
        type: 'light',
        primary: {
            light: '#3db0b9',
            main: '#0d9da8',
            dark: '#096d75'
        },
        secondary: {
            light: '#ffb433',
            main: '#ffa200',
            dark: '#b27100'
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
