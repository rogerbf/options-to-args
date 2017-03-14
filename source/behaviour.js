module.exports = (factory, configuration, type, fn) => factory({
  ...configuration,
  behaviour: (
    typeof (type) === `string`
    ? { ...configuration.behaviour, [type]: fn }
    : Object.keys(type).reduce(
      (all, key) => ({ ...all, [key]: type[key] }),
      { ...configuration.behaviour }
    )
  )
})
