module.exports = (factory, configuration, type, fn) => factory({
  ...configuration,
  behaviour: {
    ...configuration.behaviour,
    [type]: fn
  }
})
