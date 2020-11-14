import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";

import { Topbar, Footer } from "./components";

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 56,
    height: "100%",
    /* [theme.breakpoints.up("sm")]: {
      paddingTop: 64,
    }, */
  },
  content: {
    height: "100%",
    overflow: "auto",
  },
}));

const Main = (props) => {
  const { children } = props;

  const classes = useStyles();

  /* const isDesktop = useMediaQuery(theme.breakpoints.up("lg"), {
    defaultMatches: true,
  }); */

  return (
    <div
      className={clsx({
        [classes.root]: true,
        /* [classes.shiftContent]: isDesktop, */
      })}
    >
      <Topbar />
      <main className={classes.content}>{children}</main>
      <Footer />
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
