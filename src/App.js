import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import Contact from "./components/Contact";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Account from "./components/Account";
import Generate from "./components/Generate";

function App() {


  return (
    <>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/contact" component={Contact} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/generate" component={Generate} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/account" component={Account} />
        </Switch>
        <Footer />
      </div>
    </>
  );
}

export default App;
