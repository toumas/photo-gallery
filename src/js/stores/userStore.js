/**
 * Created by tuomas on 13.3.2017.
 */
import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'

class UserStore extends EventEmitter {
  constructor() {
    super()
    this.users = []
  }

  getUsers() {
    return this.users
  }

  receiveUsers(action) {
    this.users = action.users
    this.emit("change")
  }

  fetchUsers(action) {
    const url = '//jsonplaceholder.typicode.com/users/'+action.params

    fetch(url).then(function(response) {
      return response.json()
    }).then(function(obj) {
      dispatcher.dispatch({type: "RECEIVE_USERS", users: obj})
    })
  }

  handleActions(action) {
    switch(action.type) {
      case "FETCH_USERS": {
        this.fetchUsers(action)
        break
      }
      case "RECEIVE_USERS": {
        this.receiveUsers(action)
        break
      }
    }
  }
}

const userStore = new UserStore()
dispatcher.register(userStore.handleActions.bind(userStore))
export default userStore