const legacy = require(`./legacy-behaviour`)
const args = require(`./index`)

it(`is defined`, () => {
  expect(legacy).toBeDefined()
})

test(`{ files: [ 'README', 'package' ] }`, () => {
  expect(
    args.behaviour(`Array`, legacy.Array)({ files: [ `README`, `package` ] })
  )
  .toEqual([ `files=README,package` ])
})

test(`{ files: [ 'README', 'package' ] }`, () => {
  expect(
    args
    .prefix(`-`)
    .behaviour(`Array`, legacy.Array)({ files: [ `README`, `package` ] })
  )
  .toEqual([ `-files=README,package` ])
})

test(`{ t: { minifier: 'all' } }`, () => {
  expect(args.behaviour(`Object`, legacy.Object)({ t: { minifier: `all` } }))
  .toEqual([ `t`, `[ minifier all ]` ])
})

test(`{ t: { minifier: 'all' } }`, () => {
  expect(
    args
    .prefix(`-`)
    .behaviour(`Object`, legacy.Object)({ t: { minifier: `all` } })
  )
  .toEqual([ `-t`, `[ -minifier all ]` ])
})
