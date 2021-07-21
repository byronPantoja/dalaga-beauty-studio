var plugins = [{
      plugin: require('/Users/dbp/Developer/Plan-B-Projects/dalaga-beauty-studio/web/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/dbp/Developer/Plan-B-Projects/dalaga-beauty-studio/web/node_modules/gatsby-source-sanity/gatsby-ssr'),
      options: {"plugins":[],"projectId":"56xhfq3v","dataset":"production","token":"skOamQukTUPengq5k3G0UEE3Mdbq1rhhyJhUneIazuk3aEb6cLBB4kxUMvVyBql7D6ItQacH5eXpysWaRPgmKIWpU473mmW9dIj91f5aJzsHPTXOwOFhkDPA3UkplOoqonhqwFfLVJctu8ACJ3nCegJ9Da1mPasiyHQcz3Ol1qUAYvGLHGuJ","watchMode":true,"overlayDrafts":true},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
