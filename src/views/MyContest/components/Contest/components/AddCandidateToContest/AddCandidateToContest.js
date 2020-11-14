import React, { Fragment } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import PropTypes from "prop-types";

const AddCandidateToContest = ({
  isOpen,
  handleClose,
  title,
  subtitle,
  children,
}) => {
  return (
    <Fragment>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogTitle id="max-width-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{subtitle}</DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

AddCandidateToContest.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  subtite: PropTypes.string,
  children: PropTypes.element.isRequired,
};

export default AddCandidateToContest;
