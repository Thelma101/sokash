import React from "react"
import './App.css';
import Layout from "./Pages/Layout"
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Notfound from "./Pages/Notfound"
import Login from "./Pages/Login";
import ResetPassword from "./Pages/ResetPassword";
import VerifyReset from "./Pages/VerifyReset";
import Otp from "./Pages/Otp";


function App() {
  return (
    <div>
    <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
            {/* <Route exact path="/" component={Layout} /> */}

      <Route exact path="/reset-password" component={ResetPassword} />
      <Route exact path="/verify-token-login" component={VerifyReset} />

      <Route path="/dashboard" component={Layout} />
      
      <Route component={Notfound} />
    </Switch>
  </BrowserRouter>
  </div>
  );
}

export default App;
