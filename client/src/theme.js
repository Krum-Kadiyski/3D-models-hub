import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0070BF",
    },
    secondary: {
      main: "#326295",
    },
    background: {
      default: "#f2f2f2",
    },
  },
  components: {
    MuiList: {
      styleOverrides: {
        root: {
          padding: "8px 16px",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          padding: "12px 16px",
          borderRadius: 4,
          "& svg": {
            fill: "#0070BF",
          },
          "&.active": {
            "& svg": {
              fill: "white",
            },
            color: "white",
            backgroundColor: "#0070BF",
          },
          "&.active:hover": {
            backgroundColor: "#005FA2",
          },
          "&:hover": {
            backgroundColor: "#338ccb26",
          },
        },
      },
    },
  },
});
