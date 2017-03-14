import React, { Component } from 'react'
import PhotoStore from '../stores/photoStore'
import PageStore from '../stores/pageStore'
import { Link } from 'react-router'
import * as PageActions from '../Actions'
import Pagination from './Pagination'
import getParams from '../Params'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = {
      photos: PhotoStore.getCurrentPhotos(),
      page: PageStore.getCurrentPage()
    }

    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    PhotoStore.on('change', this.onChange)
  }

  componentWillUnmount() {
    PhotoStore.removeListener('change', this.onChange)
  }

  onChange() {
    this.setState({
      photos: PhotoStore.getCurrentPhotos()
    });
  }

  getUrl(photo) {
    if(_.toArray(this.props.params).length == 0) {
      var newUrl = "page/1/view/" + photo.id
    } else {
      var newUrl = ""
      const thing = _.mapKeys(this.props.params, (value, key) => {
        if(key == "albumId") key = "albums"
         newUrl += _.trim(key.toString(), "_") + "/" + value + "/"
      })
      newUrl += "view/" + photo.id
    }

    return newUrl
  }

  render() {
    PageActions.fetchPhotos(getParams(this.props.params, ["id"]))

    return (
        <div>
          <Pagination location={this.props.location} params={this.props.params}/>
          <div className="images-container">
            {
              this.state.photos.map((photo, index) => {
                return (
                    <Link key={_.uniqueId()} to={this.getUrl(photo)}>
                      <img className="lazyload"
                           data-src={_.trim(photo.thumbnailUrl, "http:")}/>
                    </Link>
                )
              })
            }
          </div>
          {this.props.children}
        </div>
    )
  }
}

export default Home