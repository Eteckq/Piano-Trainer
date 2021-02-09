export default ({ app, store }) => {
  // Every time the route changes (fired on initialization too)
  app.router.afterEach((to, from) => {
    if (process.client) {
      store.commit('piano/setLightNotes', [])
    }
  })
}
