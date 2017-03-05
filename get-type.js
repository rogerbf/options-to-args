const typeOfObject = subject =>
  [
    { test: Array.isArray, type: `array` },
    { test: subject => subject === null, type: `null` }
  ]
  .reduce(
    (result, assertion) =>
      assertion.test(subject)
      ? assertion.type
      : result,
    `object`
  )

module.exports = thing =>
  [ `undefined` ]
  .map(previous => typeof (thing) === `object` ? typeOfObject(thing) : previous)
  .map(previous => typeof (thing) === `string` ? `string` : previous)
  .map(previous => typeof (thing) === `number` ? `number` : previous)
  .map(previous => typeof (thing) === `boolean` ? `boolean` : previous)
  .pop()
