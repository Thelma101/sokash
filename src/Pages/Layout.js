import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import MenuRounded from '@material-ui/icons/MenuRounded';
// import MyAccount from './MyAccount';
import Headers from '../Component/Header';
import Navs from '../Component/Nav';
import Dashboard from "./Dashboard";
import CopyrightIcon from '@material-ui/icons/Copyright';
import {
 Root,
 Header,
 Nav,
 Content,
 Footer,
 presets,
} from 'mui-layout';
import { Route, useHistory } from 'react-router-dom';
import BorrowerList from './BorrowerList';
import LoanPendingApproval from './LoanPending';
import LoanMissed from './LoanMissed';
import LoanPendingDisbursed from './LoanPendingDisbursed';
import LoanDisbursed from "./LoanDisbursed";
import Employee from './Employee';
import UserList from './UserList';
import AdminLogs from './AdminLogs';
import UserLogs from './UserLogs';
import Transactions from './Transactions';
import RepaymentHistory from './RepaymentHistory';
import LoanProduct from './LoanProduct';
import Roles from "./Roles";
import LoanReject from "./LoanReject";
import Settings from './Settings';
import {checkIfTokenExist} from "../Services/UserToken";

const baseTheme = createMuiTheme(); 
const config = presets.createStandardLayout();

export default function Layout(props) { 
console.log(props)
const history = useHistory();
return(
  <div style={{backgroundColor: "#ffffff"}}>
  <ThemeProvider  theme={baseTheme}>
   <Root config={config}>
     <Header
       renderMenuIcon={open => 
        open ? (<ChevronLeft />) 
            : (<MenuRounded />)}
     >
           
       <Headers />
     </Header>
     <Nav
       renderIcon={collapsed =>
         collapsed ?( <ChevronRight /> ): (<ChevronLeft />)
       }
     >
    <Navs />
     </Nav>
     <Content className="content">
        { checkIfTokenExist ?  ""
         :  history.push("/")
        }
        <Route exact path={`${props.match.path}/`} component={Dashboard}/>
        <Route exact path={`${props.match.path}/borrower-list`} component={BorrowerList}/>
        <Route exact path={`${props.match.path}/loans-pending-approval`} component={LoanPendingApproval}/>
        <Route exact path={`${props.match.path}/loan-missed`} component={LoanMissed} />
        <Route exact path={`${props.match.path}/loans-pending-disbursed`} component={LoanPendingDisbursed} />
        <Route exact path={`${props.match.path}/employees`} component={Employee} />
        <Route exact path={`${props.match.path}/loans-running`} component={LoanDisbursed} />
        <Route exact path={`${props.match.path}/users`} component={UserList} />
        <Route exact path={`${props.match.path}/user-logs`} component={UserLogs} />
        <Route exact path={`${props.match.path}/admin-logs`} component={AdminLogs} />
        <Route exact path={`${props.match.path}/transactions`} component={Transactions} />
        <Route exact path={`${props.match.path}/repayment-history`} component={RepaymentHistory} />
        <Route exact path={`${props.match.path}/loan-product`} component={LoanProduct} />
        <Route exact path={`${props.match.path}/roles`} component={Roles} />
        <Route exact path={`${props.match.path}/loan-reject`} component={LoanReject} />
        <Route exact path={`${props.match.path}/settings`} component={Settings} />
     </Content>
     <Footer>
       <p style={{textAlign: 'center'}}><CopyrightIcon/> {(new Date().getFullYear())} SoKash</p>
     </Footer>
   </Root>
  </ThemeProvider>
  </div>
);
}
