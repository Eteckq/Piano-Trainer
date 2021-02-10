export default ({ app, store }) => {
  // Every time the route changes (fired on initialization too)
  app.router.afterEach((to, from) => {
    store.commit('piano/setLightNotes', [])
  })
}
