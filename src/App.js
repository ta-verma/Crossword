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
import Crossword from "./components/Crossword";
import Create from "./components/Create";
import Random from "./components/Random";
import Challenge from "./components/Challenge";
import View from "./components/View";
import UserCrosswordView from "./components/UserCrosswordView";
import ChallengeView from "./components/challengeview";

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
          <Route exact path="/crossword" component={Crossword} />
          <Route exact path="/crossword/create" component={Create} />
          <Route exact path="/crossword/random" component={Random} />
          <Route exact path="/crossword/challenge" component={Challenge} />
          <Route path="/crossword/:id" component={View} />

          <Route path="/crosswordchg/:id" component={ChallengeView} />

          <Route path="/:user/:id" component={UserCrosswordView} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/account" component={Account} />
        </Switch>
        <Footer />
      </div>
    </>
  );
}

export default App;