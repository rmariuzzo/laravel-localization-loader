const engine = require('php-parser')
const parser = new engine({
  parser: { extractDoc: true },
  ast: { withPositions: true },
})

const phpArrayParser = function (source) {
  const ast = parser.parseCode(source)
  const ret = ast.children.find((child) => child.kind === 'return')
  const parsed = parse(ret.expr)
    .reduce((acc, val) => Object.assign({}, acc, val), {})
  return `module.exports = ${JSON.stringify(parsed)};`
}

function parse(expr) {
  switch(expr.kind) {
    case 'array':
      return expr.items.map(parse)
    case 'entry':
      return { [parse(expr.key)]: parse(expr.value) }
    case 'string':
      return expr.value
    case 'number':
      return parseInt(expr.value, 10)
    default:
      throw new Error(`Unexpected PHP token ${expr.kind}`)
  }
}

module.exports = phpArrayParser
