export default function ({ store, redirect }) {
  if (store.state.auth.accessToken) {
    store.dispatch('user/GET_INFO')
  }
}
