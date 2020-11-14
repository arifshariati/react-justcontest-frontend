import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Grid, Tooltip, Button } from "@material-ui/core";

import LoadingSpinner from "../../components/LoadingSpinner";
// Redux
import { connect } from "react-redux";

import { Contest, NewContest, AddContestDialog } from "./components";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  content: {
    marginTop: theme.spacing(0),
  },
  addButton: {
    float: "right",
  },
}));

const MyContest = (props) => {
  const classes = useStyles();
  const {
    user: {
      userDetails: { userId },
    },
    data: { contests, candidates },
    UI: { loading },
  } = props;

  //const [products] = useState(mockData);

  const [isOpen, setIsOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setIsOpen(true);
  };
  const handleDialogClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          {!loading ? (
            <Tooltip title="Add New Contest">
              <Button
                onClick={handleDialogOpen}
                variant="outline"
                className={classes.addButton}
              >
                <AddCircleIcon color="primary" fontSize="large" />
              </Button>
            </Tooltip>
          ) : null}

          <AddContestDialog
            isOpen={isOpen}
            handleClose={handleDialogClose}
            title="Add Candidate To Contest"
          >
            <NewContest userId={userId} handleClose={handleDialogClose} />
          </AddContestDialog>
        </Grid>
        <Grid item lg={12} sm={12} xl={12} xs={12}>
          <Grid container spacing={0} justify="center">
            <Grid item lg={5} sm={12} xl={5} xs={12}>
              {!loading ? (
                contests &&
                contests
                  .filter((contest) => contest.userId === userId)
                  .map((contest, index) => (
                    <Contest
                      contestData={contest}
                      candidates={candidates}
                      userId={userId}
                      key={index}
                    />
                  ))
              ) : (
                <LoadingSpinner />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

MyContest.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  UI: state.UI,
});
export default connect(mapStateToProps)(MyContest);
