/**
 * Created by tuomas on 9.3.2017.
 */
import dispatcher from './dispatcher'

export function nextPage(params) {
  dispatcher.dispatch({
    type: "NEXT_PAGE"
  })
  dispatcher.dispatch({
    type: "FETCH_PHOTOS", params: params
  })
}

export function previousPage(params) {
  dispatcher.dispatch({
    type: "PREVIOUS_PAGE"
  })
  dispatcher.dispatch({
    type: "FETCH_PHOTOS", params: params
  })
}

export function fetchPhotos(params) {

  if(dispatcher.isDispatching() == false) {
    dispatcher.dispatch({
      type: "FETCH_PHOTOS", params: params
    })
  }
}

export function fetchAlbums(params) {
  if(dispatcher.isDispatching() == false) {
    dispatcher.dispatch({
      type: "FETCH_ALBUMS", params: params
    })
  }
}

export function fetchUsers(params) {
  if(dispatcher.isDispatching() == false) {
    dispatcher.dispatch({
      type: "FETCH_USERS", params: params
    })
  }
}