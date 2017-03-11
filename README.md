# options-to-args

Transform an options object into an array of args.

Suitable for use with `spawn` and `execFile`.

## usage

```javascript
const args = require(`options-to-args`)

args({
  model: `ncc-1701`,
  crew: [ `kirk`, `spock` ]
})
// [ '-model', 'ncc-1701', '-crew=kirk,spock' ]
```

### default behaviour

```javascript
args({ option: `value` })             // [ `-option`, `value` ]
args({ option: 10 })                  // [ `-option`, 10 ]
args({ option: [ `a`, `b` ] })        // [ `-option=a,b` ]
args({ options: { inner: `value` } }) // [ '-options', '[ -inner value ]' ]
args({ options: true })               // [ 'options' ]
args({ options: false })              // []
args({ options: null })               // [ '-options' ]
args({ options: undefined })          // [ '-options' ]
```

## api

All methods will return a new instance with the updated configuration.

### `args(options [, configuration])`

Parses an `options` object into an array and returns it.

Expects `configuration` to be an object with any one of the following keys:

`prefix` - a **string** with the option prefix, defaults to `'-'`.

`alias` - a **Map** of substitutions for option names.

`behaviour` - an **object** of type-specific parsers.

### `.alias(from, to)`

Add a mapping of one option name to another. i.e.

```javascript
args.alias(`version`, `v`)({ version: true })
// [ `v` ]
```

### `.alias(mappings)`

`.alias` can also consume an object containing several mappings. i.e.

```javascript
args.alias({ version: `v`, longterm: `lts` })
```

### `.prefix(prefix)`

Change the default option prefix.

### `.behaviour(type, function)`

Override the default behaviour.

`type` is a string representation of a type i.e. `'string'`

`function` is the handler for said type, it is called with an object containing:

```javascript
{
  parse,  // main parser (useful for recursive parsing)
  prefix, // command prefix
  option,    // option name
  value   // option value
}
```
