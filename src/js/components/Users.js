/**
 * Created by tuomas on 13.3.2017.
 */
import React, { Component } from 'react'
import UserStore from '../stores/userStore'
import AlbumStore from '../stores/albumStore'
import * as PageActions from '../Actions'
import { Link } from 'react-router'
import getParams from '../Params'

class Users extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: UserStore.getUsers(),
      albums: AlbumStore.getAlbums()
    }

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    UserStore.on('change', this.onChange);
    AlbumStore.on('change', this.onChange);
  }

  componentWillUnmount() {
    UserStore.removeListener('change', this.onChange);
    AlbumStore.removeListener('change', this.onChange);
  }

  onChange() {
    this.setState({
      users: UserStore.getUsers(),
      albums: AlbumStore.getAlbums()
    });
  }

  getUserInfo(obj) {
    var props = []
    _.map(obj, (value, prop) => {
      if(_.isObject(value)) {
        props.push(<div>{prop+': '}</div>)
        props.push(this.getUserInfo(value))
      } else {
        if(prop == "name" && obj.id != undefined && this.props.children == null) {
          const url = this.props.location.pathname+'/'+obj.id+'/albums/'+obj.id
          props.push(<Link to={url}>{prop+': '+value}</Link>)
        } else {
          props.push(<div>{prop+': '+value}</div>)
        }
      }
    })

    return props
  }

  getProps(album) {
    var props = []
    for(var prop in album) {
      if(prop == "id") {

        const url = 'albums/'+album[prop]+'/page/1'

        props.push(
            <div key={_.uniqueId()}>
              <Link to={url} key={_.uniqueId()}>
                {prop.toString() + ': '}{album[prop]}
              </Link>
            </div>
        )
      } else if(prop != "userId") {
        props.push(
            <div key={_.uniqueId()}>
              {prop.toString() + ': '}{album[prop]}
            </div>
        )
      }
    }
    
    if(this.props.children != null) return <div key={_.uniqueId()} className="album">{props}</div>
  }

  render() {
    PageActions.fetchUsers(getParams(this.props.params, ["userId"]))
    PageActions.fetchAlbums(getParams(this.props.params, ["id"]))

    return(
        <div>
          <div className="user-info">
            {
              this.state.users.map((user) => {
                var props = this.getUserInfo(user)
                props.push(<hr/>)
                return props
              })
            }
          </div>
          <div className="albums-container">
            {
              this.state.albums.map((album) => {
                return this.getProps(album)
              })
            }
          </div>
        </div>
    )
  }
}


export default Users

