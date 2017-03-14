/**
 * Created by tuomas on 14.3.2017.
 */
import React, { Component } from 'react'
import { Link } from 'react-router'
import * as PageActions from '../Actions'

class Pagination extends Component {
  constructor(props) {
    super(props)
  }

  nextPage() {
    PageActions.nextPage(this.getParams())
  }

  previousPage() {
    PageActions.previousPage(this.getParams())
  }

  getButtonLinks() {

    const root = this.props.location.pathname

    var nextUrl
    var prevUrl

    if(/page\/\d+/.test(root) == false) {
      nextUrl = "page/2"
      prevUrl = "page/1"
    } else {
      var path = /page\/\d+/.exec(root).toString()

      var pageId = path.substring(5)

      nextUrl = this.props.location
          .pathname.replace(/page\/\d+/, "page/"+(parseInt(pageId)+1))
      if(pageId > 1) {
        prevUrl = this.props.location
            .pathname.replace(/page\/\d+/, "page/" + (parseInt(pageId) - 1))
      }

    }

    const link = {next: nextUrl, previous: prevUrl}

    return link
  }

  getParams() {
    var params = "?"

    for(var prop in this.props.params) {
      if(prop != "id") {
        params += prop+'='+this.props.params[prop] + "&"
      }

    }

    if(Object.getOwnPropertyNames(this.props.params).length === 0) {
      params += '_page=1'
    }

    return params
  }

  render() {
    const link = this.getButtonLinks()

    return (
        <div id="pagination">
          <Link to={link.previous}>
            <button className="btn btn-primary"
                    onClick={this.previousPage.bind(this)}>
              <i className="material-icons md-light pmd-xs">navigate_before</i>
              Prev
            </button>
          </Link>
          <Link to={link.next}>
            <button className="btn btn-primary" onClick={this.nextPage.bind(this)}>
              Next
              <i className="material-icons md-light pmd-xs">navigate_next</i>
            </button>
          </Link>
        </div>
    )
  }
}


export default Pagination