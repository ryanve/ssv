# ssv
JavaScript SSV (space-separated value) utils

```sh
npm install ssv --save
```

## Usage

```js
var ssv = require('ssv')

ssv.has('mark tom travis', 'matt') // false
ssv.has('mark tom travis', 'mark') // true
ssv.remove('mark tom travis', 'tom') // 'mark travis'
ssv.add('mark travis', 'matt') // 'mark travis matt'
ssv.admit('mark travis matt', 'matt') // 'mark travis matt'
ssv.compact('  mark   travis   matt ') // 'mark travis matt'
ssv.parse('mark tom travis') // ['mark', 'tom', 'travis']
```

## API

### ssv.has(SSV, value)
Test if <var>SSV</var> string contains <var>value</var>

### ssv.compact(SSV)
Normalize <var>SSV</var> string to a trim compact string

### ssv.add(SSV, value)
Add <var>value</var> to <var>SSV</var> string

### ssv.admit(SSV, value)
Add <var>value</var> to <var>SSV</var> string if unique

### ssv.remove(SSV, value)
Remove <var>value</var> from <var>SSV</var> string

### ssv.parse(SSV)
Get array of values

## License
MIT
