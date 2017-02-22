# options-to-args

Convert an object that look like this:

```javascript
{
  t: 3000,
  x: null,
  z: true,
  files: [ `doc1`, `doc2` ],
  sub: {
    y: `why`
  }
}
```

into an array that looks like this:

```javascript
[ `-t`, 3000, `-x`, `z`, `-files=doc1,doc2`, `-sub`, `[ -y why ]`]
```

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
