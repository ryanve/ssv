# ssv
JavaScript SSV (space-separated value) utility module

## Setup
```
npm install ssv --save
```

```
yarn add ssv
```

## Usage

```js
var ssv = require('ssv')

ssv.has('mark tom travis', 'matt') // false
ssv.has('mark tom travis', 'mark') // true
ssv.remove('mark tom travis', 'tom') // 'mark travis'
ssv.add('mark travis', 'matt') // 'mark travis matt'
ssv.add('mark travis', 'travis') // 'mark travis'
ssv.push('mark travis', 'travis') // 'mark travis travis'
ssv.pop('mark travis tom') // 'tom'
ssv.slice('travis mark tom', 1) // 'mark tom'
ssv.slice('travis mark tom', -1) // 'tom'
ssv.slice(' travis mark tom', 0, 1) // 'travis'
ssv.concat('mark tom', 'travis matt') // 'mark tom travis matt'
ssv.concat(' mark  tom ', ' travis  matt ') // 'mark tom travis matt'
ssv.compact('  mark   travis   matt ') // 'mark travis matt'
ssv.split('mark tom travis') // ['mark', 'tom', 'travis']
ssv.uniq('travis travis tom travis tom') // 'travis tom'
```

## API

### ssv.has(SSV, value)
Test if <var>SSV</var> string contains <var>value</var>

### ssv.remove(SSV, value)
Remove all instances of <var>value</var> from <var>SSV</var> string

### ssv.concat(SSV, SSV2)
Concatenate 2 SSV strings

### ssv.add(SSV, value)
Add <var>value</var> to <var>SSV</var> string if unique

### ssv.push(SSV, value)
Add <var>value</var> to <var>SSV</var> string whether unique or not

### ssv.pop(SSV, value)
Get last SSV value

### ssv.slice(SSV, begin, end)
Slice SSV values per `[].slice`

### ssv.compact(SSV)
Normalize <var>SSV</var> string to a trim compact string

### ssv.split(SSV)
Get array of values. Alias: `ssv.parse`

### ssv.uniq(SSV)
Get unique <var>SSV</var> string

## License
MIT
