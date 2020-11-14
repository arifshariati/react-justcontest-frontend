import React, { Fragment } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent
} from "@material-ui/core";
import PropTypes from "prop-types";

const AddContestDialog = ({
  isOpen,
  handleClose,
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

        <DialogContent>
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

AddContestDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default AddContestDialog;
