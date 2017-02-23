# options-to-args

Convert an object i.e.:

```javascript
{
  t: 3000,
  x: null,
  z: true,
  files: [ `homesick`, `blues` ],
  sub: {
    y: `why`
  }
}
```

Into an array:

```javascript
[ `-t`, 3000, `-x`, `z`, `-files=homesick,blues`, `-sub`, `[ -y why ]`]
```

Suitable for use in `spawn` and `execFile`.

## usage

```javascript
const args = require(`options-to-args`)
const { spawn } = require(`child_process`)

const node = spawn(
  `node`,
  args({
    e: `console.log('There must be some way out of here')`
  }),
  { stdio: `inherit` }
)

node.on(`data`, data => console.log(data.toString()))
```

## api

All methods are chainable and returns a new args object with the updated state:

```javascript
const args = require(`options-to-args`)

args.setSyntax({ prefix: `--` })
args({ t: 1000 })
// [ `-t`, 1000 ]
// Probably not what you want!

const customPrefix = args.setSyntax({ prefix: `--` })
customPrefix({ t: 500 })
// [ `--t`, 500 ]
// Yes!
```

### `args(options)`

Parses the `options` object into an array.

### `args.setSyntax(syntax)`

Change the default syntax. Or rather, prefix.

```javascript
{ prefix: `-` }
```

### `args.addAlias(mapping)`

Add an alias

```javascript
const args = require(`options-to-args`).addAlias({ timeout: `t` })

args({ timeout: 2000 })
// [ `-t`, 2000 ]
```
