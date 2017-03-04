const type = require(`./get-type`)

it(`is a function`, () => {
  expect(typeof (type)).toBe(`function`)
})

it(`returns 'object'`, () => {
  expect(type({})).toEqual(`object`)
})

it(`returns 'array'`, () => {
  expect(type([])).toEqual(`array`)
})

it(`returns 'null'`, () => {
  expect(type(null)).toEqual(`null`)
})

it(`returns 'string'`, () => {
  expect(type(``)).toEqual(`string`)
})

it(`returns 'number'`, () => {
  expect(type(0)).toEqual(`number`)
})

it(`returns 'boolean'`, () => {
  expect(type(true)).toEqual(`boolean`)
})

it(`returns 'undefined'`, () => {
  expect(type(undefined)).toEqual(undefined)
})
