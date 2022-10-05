import qs from "qs";
import clsx from "clsx";
import React, { useCallback } from "react";
import { MenuItemLink, useSidebarState } from "react-admin";
import ListIcon from "@mui/icons-material/List";

import { CollapsibleMenu } from "../collapsible-menu";

import { useStyles } from "./styles";

// TODO: improve typings
export type NestedMenuProps = {
  items: any[];
  layoutStyles: any;
  iconStyle: any;
};

export const NestedMenu: React.FC<NestedMenuProps> = React.memo(
  ({ items = [], layoutStyles, iconStyle }) => {
    const [isSidebarOpen] = useSidebarState();

    const styles = useStyles();

    const renderItems = useCallback(
      ({ type, name, search, label, filter, icon: Icon, items: subItems }) => {
        if (type === "group") {
          return (
            <CollapsibleMenu
              key={`Menu.${type}.${label}`}
              label={label || name}
              isSidebarOpen={isSidebarOpen}
              layoutStyles={layoutStyles}
              iconStyle={iconStyle}
            >
              {subItems.map(renderItems)}
            </CollapsibleMenu>
          );
        }

        return (
          <MenuItemLink
            className={clsx(styles.listItem, layoutStyles.listItem)}
            key={`Item.${type}.${label}`}
            to={{
              pathname: `/${name}`,
              search: qs.stringify({
                ...search,
                filter: JSON.stringify(filter),
              }),
            }}
            primaryText={label || name}
            sidebarIsOpen={isSidebarOpen}
            leftIcon={
              Icon ? <Icon style={iconStyle} /> : <ListIcon style={iconStyle} />
            }
          />
        );
      },
      [isSidebarOpen]
    );

    return <div id="menu">{items.map(renderItems)}</div>;
  }
);

NestedMenu.displayName = "NestedMenu";
