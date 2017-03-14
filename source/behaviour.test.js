const behaviour = require(`./behaviour`)

it(`is defined`, () => {
  expect(behaviour).toBeDefined()
})

it(`calls factory with new configuration`, () => {
  const factory = jest.fn()
  const stringParser = jest.fn()
  const arrayParser = jest.fn()
  const configuration = {
    behaviour: {
      some: `parser`
    }
  }
  behaviour(factory, configuration, { stringParser, arrayParser })

  expect(factory).toHaveBeenCalledWith(
    { behaviour: { stringParser, arrayParser, some: `parser` } }
  )
})
