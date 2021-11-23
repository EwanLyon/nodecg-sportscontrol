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


// https://github.com/glideapps/glide-data-grid/blob/b0ea72b91e2de44f70390a6414dc36bf4283e5ec/core/src/data-editor/data-editor-beautiful.stories.tsx
export const tableTheme = {
  accentColor: "#8c96ff",
  accentLight: "rgba(202, 206, 255, 0.253)",

  textDark: "#ffffff",
  textMedium: "#b8b8b8",
  textLight: "#a0a0a0",
  textBubble: "#ffffff",

  bgIconHeader: "#b8b8b8",
  fgIconHeader: "#000000",
  textHeader: "#a1a1a1",
  textHeaderSelected: "#000000",

  bgCell: "#16161b",
  bgCellMedium: "#202027",
  bgHeader: "#212121",
  bgHeaderHasFocus: "#474747",
  bgHeaderHovered: "#404040",

  bgBubble: "#212121",
  bgBubbleSelected: "#000000",

  bgSearchResult: "#423c24",

  borderColor: "rgba(225,225,225,0.2)",
  drilldownBorder: "rgba(225,225,225,0.4)",

  linkColor: "#4F5DFF",

  headerFontStyle: "bold 14px",
  baseFontStyle: "13px",
  fontFamily:
      "Inter, Roboto, -apple-system, BlinkMacSystemFont, avenir next, avenir, segoe ui, helvetica neue, helvetica, Ubuntu, noto, arial, sans-serif",
};
