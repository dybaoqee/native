import createStore from '@/redux'
import createApolloClient from '@/graphql/client'
import {GET_ALL_DISTRICTS} from '@/graphql/modules/meta/queries';
import {GET_INTEREST_TYPES} from '@/graphql/modules/interest/queries';

export const READY = '@@CLIENT_READY'

export default new class Client {
  /**
   * Client ready state
   * @type {Promise}
   */
  ready = (async () => {
    this.store = createStore(this)
    this.graphql = await createApolloClient(this)
    await this.fetchInitialData()
    this.store.dispatch({type: READY})
  })()

  /**
   * Populate graphql cache before initializing app
   */
  async fetchInitialData() {
    await this.graphql.query({
      query: GET_ALL_DISTRICTS,
      fetchPolicy: 'cache-first'
    })
    await this.graphql.query({
      query: GET_INTEREST_TYPES,
      fetchPolicy: 'cache-first'
    })
  }
}()
