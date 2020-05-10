const parser = require('../dist/parser')

const doc =`foo
bar

boo
`

result = parser.parse(doc);
console.log(result);
