import {HashRouter as Router,Route,Switch} from 'react-router-dom';
import Home from '../pages/Home'
import LifeService from '../pages/LifeService'
import React from 'react'

const AppRouter = ()=>{
    return (
      <Router>
        <Switch>
          <Route path={'/'} Component={Home}></Route>
          <Route path={'/life'} Component={LifeService}></Route>
        </Switch>
      </Router>
   )
}

export default AppRouter
