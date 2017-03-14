/**
 * Created by tuomas on 12.3.2017.
 */
import React, { Component } from 'react'
import AlbumStore from '../stores/albumStore'
import * as PageActions from '../Actions'
import { Link } from 'react-router'

class Albums extends Component {
  constructor(props) {
    super(props)

    PageActions.fetchAlbums()

    this.state = {
      albums: AlbumStore.getAlbums()
    }
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AlbumStore.on('change', this.onChange);
  }

  componentWillUnmount() {
    AlbumStore.removeListener('change', this.onChange);
  }

  onChange() {
    this.setState({
      albums: AlbumStore.getAlbums()
    });
  }

  getProps() {
    var albums = []

    this.state.albums.map((album) => {
      var props = []

      for(var prop in album) {

        if(prop == "userId") {

          const url = 'users/'+album.userId+'/albums/'+album[prop]+'/'

          props.push(
              <div key={_.uniqueId()}>
                <Link to={url} key={_.uniqueId()}>
                  {prop.toString() + ': '}{album[prop]}
                </Link>
              </div>
          )
        }
        else if(prop == "id") {

          const url = this.props.location.pathname+'/'+album[prop]+'/page/1'

          props.push(
              <div key={_.uniqueId()}>
                <Link to={url} key={_.uniqueId()}>
                  {prop.toString() + ': '}{album[prop]}
                </Link>
              </div>
          )
        } else {
          props.push(
              <div key={_.uniqueId()}>
                {prop.toString() + ': '}{album[prop]}
              </div>
          )
        }

      }
      albums.push(<div key={_.uniqueId()} className="album">{props}</div>)
    })

    if(this.props.children == null) return albums
  }

  render() {
    return (
        <div>
          <div className="albums-container">
            {
              this.getProps()
            }
          </div>
          {this.props.children}
        </div>
    )
  }
}

export default Albums
