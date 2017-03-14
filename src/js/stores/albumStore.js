/**
 * Created by tuomas on 12.3.2017.
 */
import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'

class AlbumStore extends EventEmitter {
  constructor() {
    super()
    this.albums = []
  }

  getAlbums() {
    return this.albums
  }

  receiveAlbums(action) {
    this.albums = action.albums
    this.emit("change")
  }

  fetchAlbums(action) {

    if(action.params != undefined) {
      var url = '//jsonplaceholder.typicode.com/albums/'+action.params
    } else {
      var url = '//jsonplaceholder.typicode.com/albums/'
    }

    fetch(url).then(function(response) {
      return response.json()
    }).then(function(obj) {
      dispatcher.dispatch({type: "RECEIVE_ALBUMS", albums: obj})
    })
  }

  handleActions(action) {
    switch(action.type) {
      case "FETCH_ALBUMS": {
        this.fetchAlbums(action)
        break
      }
      case "RECEIVE_ALBUMS": {
        this.receiveAlbums(action)
        break
      }
    }
  }
}

const albumStore = new AlbumStore()
dispatcher.register(albumStore.handleActions.bind(albumStore))
export default albumStore