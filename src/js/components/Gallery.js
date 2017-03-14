/**
 * Created by tuomas on 10.3.2017.
 */
import React, { Component } from 'react'
import Nav from './Nav'
import getParams from '../Params'
import Home from './Photos'
import * as PageActions from '../Actions'

class Gallery extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    return (
        <div>
          <Nav params={getParams(this.props.params)} location={this.props}/>
          {this.props.children}

        </div>
    )
  }
}


export default Gallery
