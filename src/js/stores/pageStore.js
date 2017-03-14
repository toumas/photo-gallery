/**
 * Created by tuomas on 9.3.2017.
 */
import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'

class PageStore extends EventEmitter {
  constructor() {
    super()
    this.page = 1
  }

  nextPage() {
    this.page++
    this.emit('change')
  }

  previousPage() {
    if(this.page > 1) {
      this.page--
    }
    this.emit("change")
  }

  getCurrentPage() {
    return this.page
  }

  handleActions(action) {
    switch(action.type) {
      case "NEXT_PAGE": {
        this.nextPage()
        break
      }
      case "PREVIOUS_PAGE": {
        this.previousPage()
        break
      }
      case "GET_CURRENT_PAGE": {
        return this.page
        break
      }
    }
  }
}

const pageStore = new PageStore()
dispatcher.register(pageStore.handleActions.bind(pageStore))
export default pageStore