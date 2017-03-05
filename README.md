# options-to-args

Turn an options object into an array of args, suitable for use with `spawn` and `execFile`.

## usage

```javascript
const args = require(`options-to-args`)

args({
  model: `ncc-1701`,
  the: [ `final`, `frontier` ],
  tribble: {
    a: `pile`
  }
})
// [
//   '-model',
//   'ncc-1701',
//   '-the=final,frontier',
//   '-tribble',
//   '[ -a pile ]'
// ]
```

## api

### `args(options)`

### `.alias(mapping)`

### `.syntax(prefix)`

### `.behaviour(type, fn)`
