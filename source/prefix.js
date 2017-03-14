module.exports = (factory, configuration, prefix) => {
  return factory(
    Object.assign(
      {},
      configuration,
      { prefix }
    )
  )
}
