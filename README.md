# options-to-args

Transform an options object into an array of args.

Suitable for use with `spawn` and `execFile`.

**Differences from v1**

- There is no default prefix

- New default behaviour, to use the old behaviour:

  ```javascript
  const args = require(`options-to-args`)
  const legacy = args.behaviour(args.behaviours.legacy)
  ```

## usage

```javascript
const args = require(`options-to-args`).prefix(`-`)

args({
  model: `ncc-1701`,
  crew: [ `kirk`, `spock` ]
})
// [ '-model', 'ncc-1701', '-crew', 'kirk', '-crew', 'spock' ]
```

### default behaviour

```javascript
args({ option: `value` })        // [ 'option', 'value' ]
args({ option: 10 })             // [ 'option', 10 ]
args({ option: [ `a`, `b` ] })   // [ 'option', 'a', 'option', 'b' ]
args({ option: { k: `v` } })     // [ 'option', 'k', 'v' ]
args({ option: true })           // [ 'option' ]
args({ option: false })          // []
args({ option: null })           // [ 'option' ]
args({ option: undefined })      // [ 'option' ]
```

## api

All methods will return a new instance with the updated configuration.

### `args(options)`

Parses an `options` object into an array and returns it.

### `.alias(from, to)`

Add a mapping of one option name to another.

#### example

```javascript
args.alias(`version`, `v`)({ version: true })
// [ `v` ]
```

### `.alias(mappings)`

`.alias` can also consume an object containing multiple mappings.

#### example

```javascript
args.alias({ version: `v`, longterm: `lts` })
```

### `.prefix(prefix)`

Add a command prefix.

### `.behaviour(type, function)`

Override the default behaviour.

`type` string representation of a type i.e. `'string'`. [type-detect](https://github.com/chaijs/type-detect) handles type detection.

`function` type specific parser, called with an object containing:

```javascript
{
  parse,  // main parser (useful for recursive parsing)
  state,  // { alias, behaviour, prefix }
  option, // option name
  value   // option value
}
```

### `.behaviour(behaviours)`

Replace all behaviours. `behaviours` is an object with keys mapping to functions as described above.

#### example

```javascript
const args = require(`options-to-args`).behaviour(
  Object.assign(
    {},
    args.behaviours.default,
    require(`./customArrayBehaviour`) // module.exports = { Array: fn }
  )
)
```

### `.behaviours.default`

Object containing all the default behaviours

### `.behaviours.legacy`

Object containing all the legacy behaviours (used in v1)
