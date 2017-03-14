/**
 * Created by tuomas on 6.3.2017.
 */

import React, { Component } from 'react'

import { Router, Route, IndexRoute, hashHistory} from 'react-router'

import Home from './Photos'
import FullView from './FullView'
import Gallery from './Gallery'
import Albums from './Albums'
import Users from './Users'


class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <Router history={hashHistory}>
          <Route path='/' component={Gallery}>
            <IndexRoute prevLocation="/" component={Home}/>
            <Route prevLocation="/" path='page/:_page' component={Home}>
              <Route prevLocation="/" path='view/:id' component={FullView} />
            </Route>
            <Route path='albums' component={Albums}>
              <Route prevLocation="albums" path=':albumId/page/:_page' component={Home}>
                <Route prevLocation="albums" path='view/:id' component={FullView} />
              </Route>
            </Route>
            <Route path='users' component={Users}>
              <Route path=':id' component={Users}>
                <Route path='albums/:userId' component={Users} />
              </Route>
            </Route>
          </Route>
          <Route path='*' component={NotFound} />
        </Router>
    )
  }
}

const NotFound = () => (
    <h1>404.. This page is not found!</h1>)

export default App