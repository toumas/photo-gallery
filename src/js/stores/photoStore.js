/**
 * Created by tuomas on 9.3.2017.
 */
import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'

class PhotoStore extends EventEmitter {
  constructor() {
    super()
    this.photos = []

  }

  getCurrentPhotos() {
    return this.photos
  }

  receivePhotos(action) {
    this.photos = action.photos
    if(this.photos.length == 1) {
      this.emit("single")
    } else if(this.photos.length != 0) {
      this.emit("change")
    }
  }

  fetchPhotos(action) {
    const url = '//jsonplaceholder.typicode.com/photos'+action.params

    fetch(url).then(function(response) {
      return response.json()
    }).then(function(obj) {
      dispatcher.dispatch({type: "RECEIVE_PHOTOS", photos: obj})
    })
  }

  handleActions(action) {
    switch(action.type) {
      case "FETCH_PHOTOS": {
        this.fetchPhotos(action)
        break
      }
      case "RECEIVE_PHOTOS": {
        this.receivePhotos(action)
        break
      }
    }
  }
}

const photoStore = new PhotoStore()
dispatcher.register(photoStore.handleActions.bind(photoStore))
export default photoStore