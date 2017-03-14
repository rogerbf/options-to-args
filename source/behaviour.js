const { assign } = Object

module.exports = (factory, configuration, type, fn) => {
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
