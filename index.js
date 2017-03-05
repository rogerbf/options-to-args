const factory = require(`protostar`)
const _typeof = require(`./enhanced-typeof`)
const { keys, assign } = Object

const defaultConfiguration = {
  prefix: `-`,
  behaviour: {
    string: ({ prefix, option, value }) => [ prefix + option, value ],
    number: ({ prefix, option, value }) => [ prefix + option, value ],
    boolean: ({ option, value }) => value ? option : [],
    null: ({ prefix, option }) => prefix + option,
    undefined: ({ prefix, option }) => prefix + option,
    array: ({ prefix, option, value }) => (
      `${prefix}${option}=${value.join(`,`)}`
    ),
    object: ({ parse, prefix, option, value }) => [
      `${prefix + option}`,
      `[ ${parse(value).join(` `)} ]`
    ]
  },
  alias: {}
}

const parse = (factory, { prefix, alias, behaviour }, options) => (
  keys(options)
  .map(key => ({
    option: keys(alias).includes(key) ? alias[key] : key, // Maybe an alias
    value: options[key]
  }))
  .map(({ option, value }) => (
    behaviour[_typeof(value)]({
      parse: parse.bind(null, factory, { prefix, alias, behaviour }),
      prefix,
      option,
      value
    })
  ))
  .reduce((args, arg) => args.concat(arg), [])
)

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
  (options = {}, configuration = {}) =>
    factory(
      parse,
      {},
      assign(
        {},
        defaultConfiguration,
        configuration
      )
    )(options),
  factory(
    parse,
    { prefix, alias, behaviour },
    defaultConfiguration
  )
)
