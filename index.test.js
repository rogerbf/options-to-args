const parse = require(`./index`)

test(`{ t: 3000 }`, () => {
  expect(parse({ t: 3000 }))
  .toEqual([ `-t`, 3000 ])
})

test(`{ check: true }`, () => {
  expect(parse({ check: true }))
  .toEqual([ `check` ])
})

test(`{ check: false }`, () => {
  expect(parse({ check: false }))
  .toEqual([])
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
  expect(parse.prefix(`--`)({ w: 12045 }))
  .toEqual([ `--w`, 12045 ])
})

test(`alias`, () => {
  expect(parse({ timeout: 3000 }, { alias: { timeout: `t` } }))
  .toEqual([ `-t`, 3000 ])

  expect(parse.alias({ timeout: `t` })({ timeout: 2000 }))
  .toEqual([ `-t`, 2000 ])

  expect(
    parse
    .alias({ weight: `w` })
    .alias({ strength: `s` })({ weight: 10, strength: `medium` })
  )
  .toEqual([ `-w`, 10, `-s`, `medium` ])

  expect(
    parse
    .alias({ weight: `w`, strength: `s` })({
      weight: 5, strength: `low`
    })
  ).toEqual([ `-w`, 5, `-s`, `low` ])
})

test(`behaviour`, () => {
  expect(parse.behaviour(`string`, ({ parse, prefix, option, value }) => {
    return `${prefix}custom${prefix}${option}${prefix}${value.toUpperCase()}`
  })({ starship: `enterprise` }))
  .toEqual([ `-custom-starship-ENTERPRISE` ])
})
