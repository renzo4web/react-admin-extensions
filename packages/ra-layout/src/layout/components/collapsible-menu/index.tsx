import clsx from "clsx";
import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import { ExpandMore, ChevronRight } from "@mui/icons-material";

import { useStyles } from "./styles";

export type CollapsibleMenuProps = {
  label: string;
  isSidebarOpen: boolean;
  children: React.ReactElement[];
  layoutStyles: any;
  iconStyle: any;
};

export const CollapsibleMenu: React.FC<CollapsibleMenuProps> = ({
  isSidebarOpen,
  children,
  label,
  layoutStyles,
  iconStyle,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const styles = useStyles();

  const MenuItemContainer = ({ children }) => {
    if (isSidebarOpen || isOpen) {
      return children;
    }

    return (
      <Tooltip title={label} placement="right">
        {children}
      </Tooltip>
    );
  };

  return (
    <>
      <MenuItemContainer>
        <MenuItem
          className={clsx(styles.listItem, layoutStyles.listItem)}
          onClick={() => setIsOpen(!isOpen)}
        >
          <ListItemIcon style={iconStyle} className={styles.icon}>
            {isOpen ? <ExpandMore /> : <ChevronRight />}
          </ListItemIcon>
          <Typography
            variant="inherit"
            color="textSecondary"
            className={layoutStyles.listItem}
          >
            {label}
          </Typography>
        </MenuItem>
      </MenuItemContainer>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          className={clsx({
            [styles.listWhenSidebarOpen]: !!isSidebarOpen,
            [styles.listWhenSidebarClosed]: !isSidebarOpen,
          })}
        >
          {children}
        </List>
      </Collapse>
    </>
  );
};

CollapsibleMenu.displayName = "CollapsibleMenu";
