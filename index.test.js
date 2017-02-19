const parse = require(`./index`)

test(`{ t: 3000 }`, () => {
  expect(parse({ t: 3000 }))
  .toEqual([ `-t`, 3000 ])
})

test(`{ check: true }`, () => {
  expect(parse({ check: true }))
  .toEqual([ `check` ])
})

test(`{ files: [ 'README', 'package' ] }`, () => {
  expect(parse({ files: [ `README`, `package` ] }))
  .toEqual([ `-files=README,package` ])
})

test(`{ t: { minifier: 'all' } }`, () => {
  expect(parse({ t: { minifier: `all` } }))
  .toEqual([ `-t`, `[ -minifier all ]` ])
})

test(`{ z: null }`, () => {
  expect(parse({ z: null }))
  .toEqual([ `-z` ])
})

test(`{ z: undefined }`, () => {
  expect(parse({ z: undefined }))
  .toEqual([ `-z` ])
})

test(`custom syntax`, () => {
  const customParser = parse.setSyntax({ prefix: `--` })
  expect(customParser({ w: 12045 }))
  .toEqual([ `--w`, 12045 ])
})
