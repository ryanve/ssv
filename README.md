# ssv
JavaScript SSV (space-separated value) utility module

## Setup

```
npm install ssv
```

## Usage

```js
const ssv = require('ssv')

ssv.has('mark tom travis', 'matt') // false
ssv.has('mark tom travis', 'mark') // true
ssv.any('mark tom travis', 'matt') // false
ssv.any('mark tom travis', 'mark') // true
ssv.any('mark tom travis', 'mark scott') // true
ssv.add('mark travis', 'matt') // 'mark travis matt'
ssv.add('mark travis', 'travis') // 'mark travis'
ssv.push('mark travis', 'travis') // 'mark travis travis'
ssv.pop('mark travis tom') // 'tom'
ssv.slice('travis mark tom', 1) // 'mark tom'
ssv.slice('travis mark tom', -1) // 'tom'
ssv.slice(' travis mark tom', 0, 1) // 'travis'
ssv.concat('mark tom', 'travis matt') // 'mark tom travis matt'
ssv.concat(' mark  tom ', ' travis  matt ') // 'mark tom travis matt'
ssv.union('mark tom ', 'travis tom') // 'mark tom travis'
ssv.union('mark tom tom', 'travis tom') // 'mark tom travis'
ssv.union('matt mark', 'matt') // 'matt mark'
ssv.diff('mark tom travis', 'tom') // 'mark travis'
ssv.diff('mark tom tom', 'mark matt') // 'tom tom'
ssv.compact('  mark   travis   matt ') // 'mark travis matt'
ssv.split('mark tom travis') // ['mark', 'tom', 'travis']
ssv.split(' mark  tom  travis ') // ['mark', 'tom', 'travis']
ssv.uniq('travis travis tom travis tom') // 'travis tom'
```

## API

### `ssv.has(SSV, value)`
- Test if <var>SSV</var> string contains <var>value</var>

### `ssv.any(SSV1, SSV2)`
- Test if <var>SSV1</var> contains any <var>SSV2</var> values

### `ssv.concat(SSV, SSV2)`
- Concatenate 2 SSV strings

### `ssv.add(SSV, value)`
- Add <var>value</var> to <var>SSV</var> string if unique
- If you need to add multiple values then use `ssv.union`

### `ssv.push(SSV, value)`
- Add <var>value</var> to <var>SSV</var> string whether unique or not
- If you need to add multiple values then use `ssv.concat`

### `ssv.pop(SSV, value)`
- Get last SSV value

### `ssv.slice(SSV, begin, end)`
- Slice SSV values per `[].slice`

### `ssv.compact(SSV)`
- Normalize <var>SSV</var> string to a trim compact string

### `ssv.split(SSV)`
- Get compact array of values. Alias: `ssv.parse`

### `ssv.union(SSV, SSV2)`
- Get the union of 2 SSV strings (unique values present in either)

### `ssv.diff(SSV, SSV2)`
- Get the difference of 2 SSV strings (values in first not present in second)

### `ssv.uniq(SSV)`
- Get unique <var>SSV</var> string

## License
MIT
