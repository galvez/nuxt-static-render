export default async function (ctx, plugin = false) {
  if (process.server && !plugin) {
    // Ensure this only run once on the server
    // per first request, via the plugin
    return
  }

  // Access page component staticData() in top-level options
  const dataFunc = ctx.route.matched[0].components.default.options.serverData

  if (!dataFunc) {
    return
  }

  if (process.server) {
    Object.assign(ctx.$staticData, await dataFunc(ctx))
  }
}
