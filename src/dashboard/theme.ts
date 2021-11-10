import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#8bc34a',
    },
    secondary: {
      main: '#5C7AFF',
    },
    background: {
      paper: '#2E3B4E',
      default: '#222C3C',
    },
    info: {
      main: '#44e5e7',
    },
    error: {
      main: '#ef5350',
    },
  },
  components: {
    MuiTooltip: {
		defaultProps: {
			arrow: true,
		},
    },
  },
});