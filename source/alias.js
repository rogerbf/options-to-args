module.exports = (factory, configuration, from, to) => factory({
  ...configuration,
  alias: (
    typeof (from) === `object`
    ? (
      Object.keys(from)
      .reduce(
        (alias, key) => alias.set(key, from[key]),
        new Map(configuration.alias.entries())
      )
    )
    : new Map(configuration.alias.entries()).set(from, to)
  )
})
