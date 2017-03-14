import React, { Component } from 'react'
import PhotoStore from '../stores/photoStore'
import * as PageActions from '../Actions'
import { Link } from 'react-router'
import getParams from '../Params'
import { HashHistory } from 'react-router'

class FullView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      photos: PhotoStore.getCurrentPhotos()
    }

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    PhotoStore.on('single', this.onChange);
  }

  componentWillUnmount() {
    PhotoStore.removeListener('single', this.onChange);
  }

  onChange() {
    this.setState({
      photos: PhotoStore.getCurrentPhotos()
    });
  }

  getImage() {
    if(this.state.photos.length == 1) {
      var image = this.state.photos[0]
    } else {
      var image = {}
      image.url = ""
    }

    return image
  }

  getProps() {
    var props = []

    const image = this.getImage()

    for(var prop in image) {
      if(prop.toString() === "albumId") {
        const albumUrl = '/albums/'+image.albumId+'/page/1/'
        props.push(
            <Link key={_.uniqueId()} to={albumUrl}>
              <span>
                {prop.toString()+': '}{image[prop]}
              </span>
            </Link>
        )
      } else {
        props.push(
            <span key={_.uniqueId()}>
            {prop.toString() + ': '}{image[prop]}
          </span>
        )
      }
    }

    return props
  }

  getUrl() {
    switch (this.props.route.prevLocation) {
      case "albums":
        var url = this.props.route.prevLocation+
            '/'+this.getImage().albumId+
            '/page/'+this.props.params._page
        break
      case "/":
        var url = 'page/'+this.props.params._page
        break
    }

    return url
  }

  render() {
    PageActions.fetchPhotos(getParams(this.props.params, ["_page"]))

    const containerStyle = {
      display: "flex",
      flexDirection: "column"
    }

    return (
        <div id="openModal" className="modalDialog">
          <div style={containerStyle}>
            <Link to={this.getUrl()} className="close">X</Link>
            <img className="image-responsive lazyload"
                 src={_.trim(this.getImage().thumbnailUrl, "http:")}
                 data-src={_.trim(this.getImage().url, "http:")} />
            {this.getProps()}
          </div>
          {this.props.children}
        </div>
    )
  }
}

export default FullView