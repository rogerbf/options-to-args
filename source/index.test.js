const parse = require(`./index`)

test(`parse()`, () => {
  expect(parse()).toEqual([])
})

test(`{ t: 3000 }`, () => {
  expect(parse.prefix(`-`)({ t: 3000 }))
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

test(`{ get: [ 'width', 'height' ] }`, () => {
  expect(parse.prefix(`-`)({ get: [ `width`, `height` ] }))
  .toEqual([ `-get`, `width`, `-get`, `height` ])
})

test(`{ t: { minifier: 'all' } }`, () => {
  expect(parse.prefix(`-`)({ t: { minifier: `all` } }))
  .toEqual([ `-t`, `minifier`, `all` ])
})

test(`{ s: { k1: 'v1', k2: 'v2' } }`, () => {
  expect(parse.prefix(`-`)({ s: { k1: `v1`, k2: `v2` } }))
  .toEqual([ `-s`, `k1`, `v1`, `-s`, `k2`, `v2` ])
})

test(`{ z: null }`, () => {
  expect(parse.prefix(`-`)({ z: null }))
  .toEqual([ `-z` ])
})

test(`{ z: undefined }`, () => {
  expect(parse.prefix(`-`)({ z: undefined }))
  .toEqual([ `-z` ])
})

test(`custom syntax`, () => {
  expect(parse.prefix(`--`)({ w: 12045 }))
  .toEqual([ `--w`, 12045 ])
})

test(`alias`, () => {
  expect(parse.alias(`timeout`, `t`)({ timeout: 2000 }))
  .toEqual([ `t`, 2000 ])

  expect(
    parse
    .prefix(`-`)
    .alias(`weight`, `w`)
    .alias(`strength`, `s`)({ weight: 10, strength: `medium` })
  )
  .toEqual([ `-w`, 10, `-s`, `medium` ])

  expect(
    parse
    .prefix(`-`)
    .alias({ weight: `w`, strength: `s` })({
      weight: 5, strength: `low`
    })
  ).toEqual([ `-w`, 5, `-s`, `low` ])
})

test(`behaviour`, () => {
  expect(parse.prefix(`-`).behaviour(`string`, ({ parse, state: { prefix }, option, value }) => {
    return `${prefix}custom${option}${prefix}${value.toUpperCase()}`
  })({ starship: `enterprise` }))
  .toEqual([ `-custom-starship-ENTERPRISE` ])
})
