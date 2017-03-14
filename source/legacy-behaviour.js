module.exports = {
  Object: ({ parse, state, option, value }) => [
    `${option}`,
    `[ ${parse(state, value).join(` `)} ]`
  ],
  Array: ({ option, value }) => `${option}=${value.join(`,`)}`
}
