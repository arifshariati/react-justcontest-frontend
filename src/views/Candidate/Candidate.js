import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Grid,Tooltip, Button } from "@material-ui/core";

import LoadingSpinner from '../../components/LoadingSpinner';
//Icons
import AddCircleIcon from "@material-ui/icons/AddCircle";
// Redux
import { connect } from "react-redux";

import { CandidateCard, NewCandidate, AddCandidateDialog } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
  },
  content: {
    marginTop: theme.spacing(0),
  },
  addButton:{
    float:"right"
  }
}));

const Candidate = (props) => {
  const classes = useStyles();
  const {
    data: { candidates},
    user: {
      userDetails: { userId },
    },
    UI: { loading }
  } = props;

  
  const [isOpen, setIsOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setIsOpen(true);
  };
  const handleDialogClose = () => {
    setIsOpen(false);
  };

  //const [products] = useState(mockData);

  return (
    <div className={classes.root}>
      {/* <ProductsToolbar /> */}
      <div className={classes.content}>
        <Grid container spacing={1}>
        <Grid item lg={12} md={12} xl={12} xs={12}>
          {
            !loading ? (

              <Tooltip title="Add New Candidate">
                <Button onClick={handleDialogOpen} variant="outline" className={classes.addButton}>
                  <AddCircleIcon color="primary" fontSize="large" />
                </Button>
              </Tooltip>

            ): null
          }
          
          <AddCandidateDialog
            isOpen={isOpen}
            handleClose={handleDialogClose}
            title="Add Candidate To Contest"
            >
              <NewCandidate userId={userId} />
          </AddCandidateDialog>
            
          </Grid>

          
          <Grid item lg={12} sm={12} xl={12} xs={12}>
            <Grid container spacing={1}>
              { !loading ? candidates &&
                candidates
                  .filter((candidate) => candidate.userId === userId)
                  .map((candidate) => (
                    <Grid item lg={2} sm={12} xl={2} xs={12} key={candidate.candidateId}>
                      <CandidateCard candidateData={candidate} />
                    </Grid>
                  )) : ( <LoadingSpinner />)}
            </Grid>
          </Grid>
          
        </Grid>
      </div>
    </div>
  );
};

Candidate.propTypes = {
  user: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  UI: PropTypes.object
};

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  UI: state.UI
});
export default connect(mapStateToProps)(Candidate);
