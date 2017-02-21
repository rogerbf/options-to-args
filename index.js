const factory = require(`protostar`)

const parse = (factory, { syntax, alias }, options = {}) =>
  Object.keys(options)
  .reduce((configuration, key) => {
    const value = options[key]
    const option = syntax.prefix + (
      Object.keys(alias).includes(key) ? alias[key] : key
    )

    switch (Array.isArray(value) ? `array` : typeof (value)) {
      case `string`:
        return [ ...configuration, `${option}`, value ]
      case `number`:
        return [ ...configuration, `${option}`, value ]
      case `array`:
        return [ ...configuration, `${option}=${value.join(`,`)}` ]
      case `boolean`:
        return [ ...configuration, key ]
      case `undefined`:
        return [ ...configuration, `${option}` ]
      case `object`:
        return (
          value !== null
          ? [
            ...configuration,
            `${option}`,
            `[ ${parse(factory, { syntax, alias }, value).join(` `)} ]`
          ]
          : [
            ...configuration,
            `${option}`
          ]
        )
    }
  }, [])

const setSyntax = (factory, config, syntax) => {
  return factory(Object.assign(
    {},
    config,
    { syntax }
  ))
}

const addAlias = (factory, config, mapping) => {
  return factory(Object.assign(
    {},
    config,
    { alias: Object.assign({}, config.alias, mapping) }
  ))
}

const defaultConfiguration = {
  syntax: {
    prefix: `-`
  },
  alias: {}
}

module.exports = Object.assign(
  (options, configuration = {}) => factory(
    parse, {}, Object.assign({}, defaultConfiguration, configuration)
  )(options),
  factory(
    parse,
    { setSyntax, addAlias },
    defaultConfiguration
  )
)
