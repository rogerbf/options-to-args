const factory = require(`protostar`)
const type = require(`type-detect`)
const prefix = require(`./prefix`)
const alias = require(`./alias`)
const behaviour = require(`./behaviour`)
const defaultBehaviour = require(`./default-behaviour`)
const legacyBehaviour = require(`./legacy-behaviour`)
const { keys, assign } = Object

const parse = (factory, { prefix, alias, behaviour }, options) => (
  keys(options)
  .map(key => ({
    option: alias.get(key) || key,
    value: options[key]
  }))
  .map(({ option, value }) => (
    behaviour[type(value)]({
      parse: parse.bind(null, factory),
      state: { prefix, alias, behaviour },
      option: prefix ? prefix + option : option,
      value
    })
  ))
  .reduce((args, arg) => args.concat(arg), [])
)

const defaultConfiguration = {
  prefix: undefined,
  alias: new Map(),
  behaviour: defaultBehaviour
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
  ),
  {
    behaviours: {
      legacy: legacyBehaviour,
      default: defaultBehaviour
    }
  }
)
