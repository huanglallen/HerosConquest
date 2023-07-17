import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, Router } from "react-router-dom";
import * as sessionActions from "./store/session";
import HeroesIndex from "./components/HeroesIndex";
import CreateHeroForm from "./components/CreateHeroForm";
import LandingPage from "./components/LandingPage";
import Layout from "./components/Layout";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && (
        <Switch>
          <Layout isLoaded={isLoaded}>
            <Route exact path='/heroes/create' component={CreateHeroForm}/>
            <Route exact path='/heroes/all/:userId' component={HeroesIndex}/>
          </Layout>
          <Route exact path='/' component={LandingPage}/>
        </Switch>
      )}
    </>
  );
}

export default App;
