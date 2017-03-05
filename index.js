const factory = require(`protostar`)
const _typeof = require(`./enhanced-typeof`)
const { keys, assign } = Object

const defaultConfiguration = {
  prefix: `-`,
  behaviour: {
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
  const { prefix, alias, behaviour } = configuration

  return keys(options)
  .reduce((args, key) => {
    const value = options[key]
    // Convert aliases
    const option = keys(alias).includes(key) ? alias[key] : key

    return args.concat(behaviour[_typeof(value)](
      parse.bind(null, factory, configuration),
      prefix,
      option,
      value
    ))
  }, [])
}

// METHOD
const prefix = (factory, configuration, prefix) => {
  return factory(
    assign(
      {},
      configuration,
      { prefix }
    )
  )
}

// METHOD
const alias = (factory, configuration, mapping) => {
  return factory(
    assign(
      {},
      configuration,
      { alias: assign({}, configuration.alias, mapping) }
    )
  )
}

// METHOD
const behaviour = (factory, configuration, type, fn) => {
  return factory(
    assign(
      {},
      configuration,
      {
        behaviour: assign(
          {},
          configuration.behaviour,
          { [type]: fn }
        )
      }
    )
  )
}

module.exports = assign(
  (options = {}, configuration = {}) => factory(
    parse, {}, assign({}, defaultConfiguration, configuration)
  )(options),
  factory(parse, { prefix, alias, behaviour }, defaultConfiguration)
)
