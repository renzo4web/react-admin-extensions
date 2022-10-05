import clsx from "clsx";
import React from "react";
import { Avatar, Tooltip } from "@mui/material";
import { MenuItemLink, useGetIdentity } from "react-admin";

import { useStyles } from "./styles";
import { PersonOutlined } from "@mui/icons-material";

// TODO: improve typings
export type UserProfileProps = {
  layoutStyles?: any;
};

// TODO: improve component
export const UserProfile: React.FC<UserProfileProps> = ({ layoutStyles }) => {
  const { identity: user, isLoading } = useGetIdentity();

  const styles = useStyles();

  if (!isLoading && !!user) {
    const firstLetters = user?.fullName
      ?.split(" ")
      .map((parts: any) => parts[0])
      .join("")
      .toUpperCase();

    return (
      <Tooltip title={user?.fullName} aria-label={user?.fullName}>
        <MenuItemLink
          leftIcon={
            <div className={styles.root}>
              {!!user && user.avatar && (
                <Avatar
                  src={user.avatar}
                  alt={user.fullName}
                  className={clsx(styles.small, layoutStyles.avatar)}
                />
              )}
              {(!user || (!!user && !user.avatar)) && (
                <Avatar
                  alt={user?.fullName}
                  className={clsx(styles.small, layoutStyles.avatar)}
                >
                  {firstLetters}
                </Avatar>
              )}
            </div>
          }
          primaryText={user?.fullName}
          className={clsx(styles.menuLink, layoutStyles.menuLink)}
          to="/"
        />
      </Tooltip>
    );
  }

  return (
    <MenuItemLink
      to="/"
      primaryText="Cargando..."
      className={clsx(styles.menuLink, layoutStyles.menuLink)}
      leftIcon={<PersonOutlined />}
    />
  );
};

UserProfile.displayName = "UserProfile";
