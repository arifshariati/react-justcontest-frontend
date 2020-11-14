import React from "react";
import PropTypes from "prop-types";
// MUI
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";

// Redux
import { connect } from "react-redux";

// Import Dashboard Ststs Chart
import { PaperLineChart } from "react-materialui-charts";

const data = require("./data");

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const Dashboard = (props) => {
  const classes = useStyles();
  const {
    data: { summary },
    UI: { loading },
  } = props;

  return (
    <div className={classes.root}>
      <Grid container spaccing={4}>
        <Grid item xs={12} sm={12} lg={12} xl={12}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} lg={4} xl={4}>
              <PaperLineChart
                width={500}
                height={150}
                title="Candidates"
                value={summary.totalCandidates}
                data={data}
                dataLines={["values"]}
                chartColor={["#f50057"]}
                backgroundGradient={["#FE6B8B", "#FF8E53"]}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} lg={12} xl={12}>
          <h1>Arif Here</h1>
        </Grid>
      </Grid>
    </div>
  );
};

Dashboard.propTypes = {
  data: PropTypes.object,
  UI: PropTypes.object,
};

const mapStateToProps = (state) => ({
  data: state.data,
  UI: state.UI,
});
export default connect(mapStateToProps, null)(Dashboard);
