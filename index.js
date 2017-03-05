const factory = require(`protostar`)
const _typeof = require(`./get-type`)
const { keys, assign } = Object

const defaultConfiguration = {
  prefix: `-`,
  behaviours: {
    string: (parse, prefix, option, value) => [ prefix + option, value ],
    number: (parse, prefix, option, value) => [ prefix + option, value ],
    array: (parse, prefix, option, value) => `${prefix + option}=${value.join(`,`)}`,
    boolean: (parse, prefix, option, value) => value ? option : [],
    null: (parse, prefix, option, value) => prefix + option,
    undefined: (parse, prefix, option, value) => prefix + option,
    object: (parse, prefix, option, value) => [
      `${prefix + option}`,
      `[ ${parse(value).join(` `)} ]`
    ]
  },
  alias: {}
}

const parse = (factory, configuration, options) => {
  const { prefix, alias, behaviours } = configuration
  const _parse = parse.bind(null, factory, configuration)

  return keys(options)
  .reduce((args, key) => {
    const value = options[key]

    // Convert aliases
    const option = keys(alias).includes(key) ? alias[key] : key

    switch (_typeof(value)) {
      case `string`:
        return args.concat(
          behaviours.string(_parse, prefix, option, value)
        )
      case `number`:
        return args.concat(
          behaviours.number(_parse, prefix, option, value)
        )
      case `array`:
        return args.concat(
          behaviours.array(_parse, prefix, option, value)
        )
      case `boolean`:
        return args.concat(
          behaviours.boolean(_parse, prefix, option, value)
        )
      case `undefined`:
        return args.concat(
          behaviours.undefined(_parse, prefix, option, value)
        )
      case `object`:
        return args.concat(
          behaviours.object(_parse, prefix, option, value)
        )
      case `null`:
        return args.concat(
            behaviours.null(_parse, prefix, option, value)
        )
    }
  }, [])
}

// METHOD
const prefix = (factory, config, prefix) => {
  return factory(assign(
    {},
    config,
    { prefix }
  ))
}

// METHOD
const alias = (factory, config, mapping) => {
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
  factory(parse, { prefix, alias }, defaultConfiguration)
)
