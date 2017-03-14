const engine = require('php-parser')
const parser = new engine({
  parser: { extractDoc: true },
  ast: { withPositions: true },
})

/**
 * The PHP array parser.
 * @param  {string} source The PHP source contents.
 * @return {string}        The parsed contents.
 */
const phpArrayParser = function (source) {
  const ast = parser.parseCode(source)
  const ret = ast.children.find((child) => child.kind === 'return')
  const parsed = parse(ret.expr)
  return `module.exports = ${JSON.stringify(parsed)};`
}

/**
 * Parse a PHP expression to JavaScript
 * @param  {Object} expr The AST PHP expression.
 * @return {*}           A JavaScript object or value.
 */
function parse(expr) {
  switch(expr.kind) {
    case 'array':
      const isKeyed = expr.items.every((item) => item.key !== null)
      let items = expr.items.map(parse)
      if (isKeyed) {
        items = items.reduce((a, v) => Object.assign({}, a, v), {})
      }
      return items
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
