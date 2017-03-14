/**
 * Created by tuomas on 10.3.2017.
 */
import React, { Component } from 'react'
import { Link } from 'react-router'
import PageStore from '../stores/pageStore'

class Nav extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      page: PageStore.getCurrentPage()
    }

    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    PageStore.on('change', this.onChange)
  }

  componentWillUnmount() {
    PageStore.removeListener('change', this.onChange)
  }

  onChange() {
    this.setState({
      page: PageStore.getCurrentPage()
    });
  }

  render() {
    return (
        <div id="nav">
          <Link to="/">Home</Link>
          <span> | </span>
          <Link to="albums">Albums</Link>
          <span> | </span>
          <Link to='users'>Users</Link>
          <hr />
        </div>
    )
  }
}

export default Nav