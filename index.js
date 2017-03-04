const factory = require(`protostar`)
const keys = Object.keys
const assign = Object.assign

const defaultConfiguration = {
  syntax: {
    prefix: `-`
  },
  alias: {}
}

// MAIN
const parse = (factory, { syntax, alias }, options) =>
  keys(options)
  .reduce((configuration, key) => {
    const value = options[key]
    const option = syntax.prefix + (
      keys(alias).includes(key) ? alias[key] : key
    )

    switch (Array.isArray(value) ? `array` : typeof (value)) {
      case `string`:
        return [ ...configuration, `${option}`, value ]
      case `number`:
        return [ ...configuration, `${option}`, value ]
      case `array`:
        return [ ...configuration, `${option}=${value.join(`,`)}` ]
      case `boolean`:
        return value ? [ ...configuration, key ] : configuration
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

// METHOD
const setSyntax = (factory, config, syntax) => {
  return factory(assign(
    {},
    config,
    { syntax }
  ))
}

// METHOD
const addAlias = (factory, config, mapping) => {
  return factory(assign(
    {},
    config,
    { alias: assign({}, config.alias, mapping) }
  ))
}

module.exports = assign(
  (options = {}, configuration = {}) => factory(
    parse, {}, assign({}, defaultConfiguration, configuration)
  )(options),
  factory(parse, { setSyntax, addAlias }, defaultConfiguration)
)
