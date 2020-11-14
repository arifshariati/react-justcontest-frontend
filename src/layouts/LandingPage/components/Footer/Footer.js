import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography, Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.white,
  },
}));

const Footer = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Grid container justify="center" spacing={4}>
        <Grid item lg={8} sm={12} xl={8} xs={12}>
          <Grid container spacing={4} justify="center">
            <Typography variant="body">
              &copy;{" "}
              <Link
                component="a"
                href="https://covid19-updates.info"
                target="_blank"
                color="#FFF"
              >
                Arif Shariati {`  `}
              </Link>
              @ 2020
            </Typography>
          </Grid>
        </Grid>
        <Grid item lg={8} sm={12} xl={8} xs={12}>
          <Grid container spacing={4} justify="center">
            <Typography variant="body">
              This website is developed with love of Investment in Stock Market
              and Currencies. This website portrays concept of Investment Firm
              Portal where novoice investors can invest in Investment Firm's
              products and achieve high performance rewards by team of highly
              professional traders.
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
