import React from "react"
import {
  Switch,
  Route
} from "react-router-dom"

// pages
import Home from './pages/home/index.js'
import Questions from './pages/questions/index.js'
import Results from './pages/results/index.js'

function Routes () {
  return (
    <Switch>
      <Route path="/questions">
        <Questions />
      </Route>
      <Route path="/results">
        <Results />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  )
}

export default Routes