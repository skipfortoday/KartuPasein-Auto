import { grey, yellow } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  // Customize Material-UI with your theme
  // See more here: https://material-ui.com/customization/themes/
  palette: {
    type: "light",
    primary: {
      main: yellow[700],
    },
    secondary: {
      main: grey[700],
    },
  },
});

export default theme;
