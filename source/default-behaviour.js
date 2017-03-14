const { keys, assign } = Object

module.exports = {
  string: ({ option, value }) => [ option, value ],
  number: ({ option, value }) => [ option, value ],
  boolean: ({ option, value }) => value ? [ option ] : [],
  null: ({ option }) => [ option ],
  undefined: ({ option }) => [ option ],
  Array: ({ option, value }) => value.reduce(
    (acc, v) => [ ...acc, option, v ],
    []
  ),
  Object: ({ parse, state, option, value }) => {
    const values = keys(value)
    return values.length > 1
    ? (
      values.reduce((acc, v) => [
        ...acc,
        option,
        ...parse(assign({}, state, { prefix: undefined }), { [v]: value[v] })
      ], [])
    )
    : [ option, values[0], value[values[0]] ]
  }
}
