import React from "react";
import { makeStyles } from "@material-ui/styles";

import { UsersTable } from "./components";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  content: {
    marginTop: theme.spacing(2),
  },
}));

const UserList = () => {
  const classes = useStyles();

  //const [users] = useState(mockData);

  return (
    <div className={classes.root}>
      {/* <UsersToolbar /> */}
      <div className={classes.content}>
        {/* <UsersTable users={users} /> */}
        <UsersTable />
      </div>
    </div>
  );
};

export default UserList;
