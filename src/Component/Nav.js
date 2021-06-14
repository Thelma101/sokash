


import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Link } from 'react-router-dom';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import HistoryOutlinedIcon from '@material-ui/icons/HistoryOutlined';
import LocalConvenienceStoreOutlinedIcon from '@material-ui/icons/LocalConvenienceStoreOutlined';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import AnnouncementOutlinedIcon from '@material-ui/icons/AnnouncementOutlined';
import CallOutlinedIcon from '@material-ui/icons/CallOutlined';
import ContactSupportOutlinedIcon from '@material-ui/icons/ContactSupportOutlined';
import FeedbackOutlinedIcon from '@material-ui/icons/FeedbackOutlined';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import PostAddOutlinedIcon from '@material-ui/icons/PostAddOutlined';
import { Settings } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    // maxWidth: 360,
    // backgroundColor: "#007945",
    // color: '#ffffff'
    // background: "#007945",
    borderRadius: "4px",
  },
}));

export default function SelectedListItem() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className={classes.root}>

      <List component="nav" aria-label="main mailbox folders">
        <ListItem
          component={Link} to="/dashboard"
          button
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <AccountCircleOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem
          component={Link} to="/dashboard/borrower-list"
          button
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <HomeOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Borrower List" />
        </ListItem>
        <ListItem
          component={Link} to="/dashboard/loans-pending-approval"
          button
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemIcon>
            <HistoryOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Loan Pending Approval" />
        </ListItem>
        <ListItem
          component={Link} to="/dashboard/loans-pending-disbursed"
          button
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemIcon>
            <WorkOutlineOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Loans Pending Disbursed" />
        </ListItem>
        <ListItem
          component={Link} to="/dashboard/loans-running"
          button
          selected={selectedIndex === 4}
          onClick={(event) => handleListItemClick(event, 4)}
        >
          <ListItemIcon>
            <WorkOutlineOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Loans Running" />
        </ListItem>
        <ListItem
          component={Link} to="/dashboard/loan-missed"
          button
          selected={selectedIndex === 5}
          onClick={(event) => handleListItemClick(event, 5)}
        >
          <ListItemIcon>
            <LocalConvenienceStoreOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Loan Missed" />
        </ListItem>

        <ListItem
          component={Link} to="/dashboard/loan-product"
          button
          selected={selectedIndex === 6}
          onClick={(event) => handleListItemClick(event, 6)}
        >
          <ListItemIcon>
            <PostAddOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Loan Product" />
        </ListItem>
        <ListItem
          component={Link} to="/dashboard/loan-reject"
          button
          selected={selectedIndex === 17}
          onClick={(event) => handleListItemClick(event, 17)}
        >
          <ListItemIcon>
            <GroupAddOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Reject Loan" />
        </ListItem>

        <ListItem
          component={Link} to="/dashboard/employees"
          button
          selected={selectedIndex === 7}
          onClick={(event) => handleListItemClick(event, 7)}
        >
          <ListItemIcon>
            <CallOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Employees" />
        </ListItem>
        <ListItem
          component={Link} to="/dashboard/settings"
          button
          selected={selectedIndex === 8}
          onClick={(event) => handleListItemClick(event, 8)}
        >
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>

        {/* <ListItem
          button
          selected={selectedIndex === 8}
          onClick={(event) => handleListItemClick(event, 8)}
        >
          <ListItemIcon>
            <FeedbackOutlinedIcon /> 
          </ListItemIcon>
          <ListItemText primary="Submit Feedback" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 9}
          onClick={(event) => handleListItemClick(event, 9)}
        >
          <ListItemIcon>
            <GroupAddOutlinedIcon /> 
          </ListItemIcon>
          <ListItemText primary="Refer and earn" />
        </ListItem> */}
         <ListItem
          component={Link} to="/dashboard/users"
          button
          selected={selectedIndex === 10}
          onClick={(event) => handleListItemClick(event, 10)}
        >
          <ListItemIcon>
            <GroupAddOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>

        <ListItem
          component={Link} to="/dashboard/admin-logs"
          button
          selected={selectedIndex === 11}
          onClick={(event) => handleListItemClick(event, 11)}
        >
          <ListItemIcon>
            <GroupAddOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Admin Logs" />
        </ListItem>
        <ListItem
          component={Link} to="/dashboard/user-logs"
          button
          selected={selectedIndex === 12}
          onClick={(event) => handleListItemClick(event, 12)}
        >
          <ListItemIcon>
            <GroupAddOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Users Logs" />
        </ListItem>
        <ListItem
          component={Link} to="/dashboard/transactions"
          button
          selected={selectedIndex === 13}
          onClick={(event) => handleListItemClick(event, 13)}
        >
          <ListItemIcon>
            <GroupAddOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Transactions" />
        </ListItem>

        <ListItem
          component={Link} to="/dashboard/repayment-history"
          button
          selected={selectedIndex === 14}
          onClick={(event) => handleListItemClick(event, 14)}
        >
          <ListItemIcon>
            <GroupAddOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Repayment History" />
        </ListItem>

        <ListItem
          component={Link} to="/dashboard/roles"
          button
          selected={selectedIndex === 15}
          onClick={(event) => handleListItemClick(event, 15)}
        >
          <ListItemIcon>
            <GroupAddOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Admin Roles" />
        </ListItem>

        <Divider />

        <ListItem
          component={Link} to="/"
          button
          selected={selectedIndex === 16}
          onClick={(event) => handleListItemClick(event, 16)}
        >
          <ListItemIcon>
            <ExitToAppOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItem>
      </List>
      {/* <List component="nav" aria-label="secondary mailbox folder">
        <ListItem
          button
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemText primary="Trash" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemText primary="Spam" />
        </ListItem>
      </List> */}
    </div>
  );
}
