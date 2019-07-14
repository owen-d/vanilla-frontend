import React from 'react';
import { Theme, createMuiTheme, WithStyles, MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import indigo from '@material-ui/core/colors/indigo';
/* import pink from '@material-ui/core/colors/pink'; */
import brown from '@material-ui/core/colors/brown';
/* import teal from '@material-ui/core/colors/teal'; */
import red from '@material-ui/core/colors/red';

// All the following keys are optional.
// We try our best to provide a great default value.
export const theme = createMuiTheme({
    palette: {
        /* primary: brown, */
        /* secondary: indigo, */
        error: red,
        // Used by `getContrastText()` to maximize the contrast between the background and
        // the text.
        contrastThreshold: 3,
        // Used to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
    },
});

export function withTheme<P>(theme: Theme, Component: React.ComponentType<P>) {
    return function WithTheme(props: P) {
        // MuiThemeProvider makes the theme available down the React tree
        // thanks to React context.
        return (
            <MuiThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Component {...props} />
            </MuiThemeProvider>
        );
    }
}
