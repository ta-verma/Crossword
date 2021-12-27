import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./components/Navigation/Header";
import Footer from "./components/Navigation/Footer";
import Landing from "./components/Public/Landing";
import Contact from "./components/Public/Contact";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import Dashboard from "./components/UserPages/Dashboard";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import Account from "./components/UserPages/Account";
import Crossword from "./components/Crossword/Crossword";
import Create from "./components/Crossword/Create";
import Random from "./components/Crossword/Random";
import Challenge from "./components/Crossword/Challenge";
import View from "./components/Helper/View";
import UserCrosswordView from "./components/Helper/UserCrosswordView";
import Error from "./components/Helper/Error";
import ChallengeView from "./components/Helper/ChallengeView";
import AboutUs from "./components/Public/about";

function App() {


  return (
    <>
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/crossword" component={Crossword} />
          <Route exact path="/crossword/create" component={Create} />
          <Route exact path="/crossword/random" component={Random} />
          <Route exact path="/crossword/challenge" component={Challenge} />
          <Route exact path="/crossword/:id" component={View} />
          <Route path="/crosswordchg/:id" component={ChallengeView} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/account" component={Account} />
          <Route exact path="/:user/:id" component={UserCrosswordView} />
          <Route exact path="/about" component={AboutUs} />
          <Route component={Error} />
        </Switch>
        <Footer />
      </div>
    </>
  );
}

export default App;