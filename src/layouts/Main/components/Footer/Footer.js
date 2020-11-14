import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Typography, Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const Footer = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography variant="body1">
        &copy;{" "}
        <Link component="a" href="https://covid19-updates.info" target="_blank">
          Arif Shariati
        </Link>
        . 2020
      </Typography>
      <Typography variant="caption">
        This website is developed with love of Investment in Stock Market and
        Currencies. This website portrays concept of Investment Firm Portal
        where novoice investors can invest in Investment Firm's products and
        achieve high performance rewards by team of highly professional traders.
      </Typography>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
