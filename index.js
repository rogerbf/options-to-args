const parse = (syntax, options) =>
  Object.keys(options)
  .reduce((configuration, key) => {
    const value = options[key]
    const option = syntax.prefix + key

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
            `[ ${parse(syntax, value).join(` `)} ]`
          ]
          : [
            ...configuration,
            `${option}`
          ]
        )
    }
  }, [])

const setSyntax = (parse, syntax) => {
  return Object.assign(
    parse.bind(null, syntax),
    { setSyntax: setSyntax.bind(null, parse) }
  )
}

const defaultSyntax = {
  prefix: `-`
}

module.exports = Object.assign(
  parse.bind(null, defaultSyntax),
  { setSyntax: setSyntax.bind(null, parse) }
)
