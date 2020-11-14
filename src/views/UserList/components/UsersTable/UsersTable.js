import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import moment from "moment";
import NumberFormat from "react-number-format";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardContent,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

import { getInitials } from "../../../../helpers";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {},
  content: {
    padding: 0,
  },
  inner: {
    minWidth: 1050,
  },
  nameContainer: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  actions: {
    justifyContent: "flex-end",
  },
}));

const UsersTable = (props) => {
  const {
    className,
    data: { clientsList },
    ...rest
  } = props;

  const classes = useStyles();

  /* const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0); */

  /* const handleSelectAll = (event) => {
    const { users } = props;

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = users.map((user) => user.id);
    } else {
      selectedUsers = [];
    }

    setSelectedUsers(selectedUsers);
  }; */

  /* const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    setSelectedUsers(newSelectedUsers);
  }; */

  /* const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(event.target.value);
  }; */

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.length === users.length}
                      color="primary"
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < users.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell> */}
                  <TableCell>Client</TableCell>
                  <TableCell>Email</TableCell>
                  {/* <TableCell>Location</TableCell> */}
                  <TableCell>Phone</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Equity</TableCell>
                  <TableCell>Plans Count</TableCell>
                  <TableCell>Investment</TableCell>
                  <TableCell>Profits</TableCell>
                  <TableCell>Clients Referred</TableCell>
                  <TableCell>Referral Commission</TableCell>
                  <TableCell>Registration date</TableCell>
                  <TableCell align="right">Duration</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* {users.slice(0, rowsPerPage).map((user) => ( */}
                {clientsList.map((user) => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={user.clientId}
                    /* selected={selectedUsers.indexOf(user.id) !== -1} */
                  >
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUsers.indexOf(user.id) !== -1}
                        color="primary"
                        onChange={(event) => handleSelectOne(event, user.id)}
                        value="true"
                      />
                    </TableCell> */}
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Avatar
                          className={classes.avatar}
                          src={user.profileImage}
                        >
                          {getInitials(user.firstName)}
                        </Avatar>
                        <Typography variant="body1">
                          {user.firstName} {user.lastName}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    {/* <TableCell>
                      {user.address.city}, {user.address.state},{" "}
                      {user.address.country}
                    </TableCell> */}
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.roles}</TableCell>
                    <TableCell>
                      <NumberFormat
                        value={
                          user.plansAmount +
                          user.profitAmountAvailable +
                          user.referralAmountAvailable
                        }
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                        decimalScale={"1"}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <NumberFormat
                        value={user.plansCount}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <NumberFormat
                        value={user.plansAmount}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                        decimalScale={"0"}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <NumberFormat
                        value={user.profitAmountAvailable}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                        decimalScale={"1"}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <NumberFormat
                        value={user.referralCount}
                        displayType={"text"}
                        thousandSeparator={true}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <NumberFormat
                        value={user.referralAmountAvailable}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                        decimalScale={"1"}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {moment(user.createdAt).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell align="right">
                      {moment(user.createdAt).fromNow()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      {/* <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={users.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions> */}
    </Card>
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps)(UsersTable);
