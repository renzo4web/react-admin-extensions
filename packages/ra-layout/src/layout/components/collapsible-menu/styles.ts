import makeStyles from "@mui/material/styles/makeStyles";
import { Theme } from "@mui/material/styles/createTheme";

export const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    minWidth: theme.spacing(5),
  },
  listItem: {
    minHeight: "48px !important",
  },
  listWhenSidebarOpen: {
    "& a": {
      [theme.breakpoints.up("xs")]: {
        paddingLeft: theme.spacing(4),
        transition: "padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
      },
    },
  },
  listWhenSidebarClosed: {
    "& a": {
      [theme.breakpoints.up("xs")]: {
        paddingLeft: theme.spacing(2),
        transition: "padding-left 195ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
      },
    },
  },
}));
