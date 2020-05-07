# ssv

Opensource JavaScript for <b>space-separated values</b> in [websites](#download) or [Node.js](#package)

### [download](https://raw.githubusercontent.com/ryanve/ssv/master/ssv.js)

```js
<script src="ssv.js"></script>
```

### [package](https://www.npmjs.com/package/ssv)

```
npm install ssv --save
```

```js
const ssv = require("ssv")
```

## methods

- [`ssv.and`](#and)
- [`ssv.any`](#any)
- [`ssv.at`](#at)
- [`ssv.blank`](#blank)
- [`ssv.count`](#count)
- [`ssv.edit`](#edit)
- [`ssv.gum`](#gum)
- [`ssv.jam`](#jam)
- [`ssv.not`](#not)
- [`ssv.or`](#or)
- [`ssv.say`](#say)
- [`ssv.split`](#split)
- [`ssv.xor`](#xor)
- [`ssv.yolo`](#yolo)

### `all`

Test if SSV contains **all** search values

```js
ssv.all(SSV="", search="")
```

```js
ssv.all("mark tom travis", "scott") // false
ssv.all("mark tom travis", "mark tom") // true
ssv.all("mark tom travis", "mark scott") // false
```

### `and`

- Get unique values present both in `left` **and** `right`
- Ideal for intersecting

```js
ssv.and(left="", right="")
```

```js
ssv.and("", "mark") // ""
ssv.and("mark matt travis", "tom scott") // ""
ssv.and("mark tom tom", "mark tom travis") // "mark tom"
```

```js
let many = ["mark tom", "mark travis", "mark matt"]
many.reduce(ssv.and) // "mark"
```

### `any`

Test if SSV contains **any** search values

```js
ssv.any(SSV="", search="")
```

```js
ssv.any("mark tom travis", "matt") // false
ssv.any("mark tom travis", "mark") // true
ssv.any("mark tom travis", "mark scott") // true
ssv.any("mark tom travis", "mark travis") // true
```

### `at`

Get the value at `index`

```js
ssv.at(SSV="", index)
```

```js
ssv.at("mark tom travis", 0) // "mark"
ssv.at("mark tom travis", 1) // "tom"
ssv.at("mark tom travis", -1) // "travis"
ssv.at("mark tom travis", -2) // "tom"
ssv.at("mark tom travis", 5) // ""
```

### `blank`

Test if SSV is blank

```js
ssv.blank(SSV="")
```

```js
ssv.blank("travis") // false
ssv.blank("      ") // true
ssv.blank("") // true
ssv.blank(0) // false
ssv.blank() // true
```

### `count`

Count SSV values

```js
ssv.count(SSV="")
```

```js
ssv.count("matt matt matt") // 3
ssv.count("mark      tom ") // 2
```

### `edit`

- Edit an SSV string via an object or string
- Optimal for batch editing CSS classes
- Keys for falsey values are removed
- Keys for truthy values are added
- Removals process before adds
- Result is compact and unique
- Like [`ssv.or`](#or) if `boss` is string
- [`ssv.state`](#state) uses [`ssv.edit`](#edit)

```js
ssv.edit(SSV="", boss={})
```

```js
ssv.edit("mark tom travis", {
  "matt": true,
  "tom scott": false
}) // "mark travis matt"

ssv.edit("mark", {
  "mark travis": true,
  "travis": false
}) // "mark travis"
```

```js
ssv.edit("mark tom scott", Object.assign(
  { scott: false },
  { travis: true }
)) // "mark tom travis"
```

```js
let bosses = [/* objects or strings */]
bosses.reduce(ssv.edit, "") // forward
bosses.reduceRight(ssv.edit, "") // backward
```

### `gum`

Concatenate with compact space

```js
ssv.gum(left="", right="")
```

```js
ssv.gum("mark tom", "scott travis") // "mark tom scott travis"
ssv.gum("mark tom", "tom   travis") // "mark tom tom travis"
```

```js
let many = ["tom tom", null, "travis travis", ""]
many.reduce(ssv.gum) // "tom tom travis travis"
```

### `jam`

Compact excess space

```js
ssv.jam(SSV)
```

```js
ssv.jam("  mark  travis   matt ") // "mark travis matt"
ssv.jam("  matt      ") // "matt"
ssv.jam("  0     182 ") // "0 182"
ssv.jam(-182) // "-182"
ssv.jam(182) // "182"
ssv.jam(" ") // ""
ssv.jam(0) // "0"
ssv.jam() // ""
```

### `not`

- Get values in `left` that are **not** in `right`
- Ideal for removing values or diffing

```js
ssv.not(left="", right="")
```

```js
ssv.not("mark tom travis", "tom") // "mark travis"
ssv.not("mark tom tom", "mark matt") // "tom tom"
ssv.not("matt matt matt", "") // "matt matt matt"
ssv.not("mark mark", "tom tom") // "mark mark"
ssv.not("mark tom tom tom", "tom") // "mark"
```

```js
let many = ["mark tom", "mark travis", "mark matt"]
many.reduce(ssv.not) // "tom"
```

### `or`

- Get unique values found in `left` **or** `right` **or** both
- Ideal for adding values or unioning

```js
ssv.or(left="", right="")
```

```js
ssv.or("mark tom ", "travis tom") // "mark tom travis"
ssv.or("mark tom tom", "travis tom") // "mark tom travis"
ssv.or("matt mark", "matt") // "matt mark"
```

```js
let many = ["mark tom", "mark travis", "mark matt"]
many.reduce(ssv.or) // "mark tom travis matt"
```

### `say`

Simply stringify unknown

```js
ssv.say(unknown="")
```

```js
ssv.say(undefined) // ""
ssv.say(null) // ""
ssv.say(0) // "0"
ssv.say(NaN) // "NaN"
ssv.say(182) // "182"
ssv.say("tom") // "tom"
ssv.say(true) // "true"
ssv.say(false) // "false"
ssv.say(new Number(182), "182")
ssv.say(new String("tom"), "tom")
ssv.say(new Boolean(true), "true")
```

- Used internally when expecting strings
- Not intended for arrays or plain objects
- Join arrays instead like `[].join(" ")`
- Plain objects may use [`ssv.edit`](#edit) or [`ssv.state`](#state)

### `split`

Split SSV into dense array

```js
ssv.split(SSV)
```

```js
ssv.split("mark tom travis") // ["mark", "tom", "travis"]
ssv.split("     mark  tom ") // ["mark", "tom"]
ssv.split("0 0  182       ") // ["0", "0", "182"]
ssv.split(0) // ["0"]
ssv.split(" ") // []
ssv.split("") // []
ssv.split() // []
```

### `state`

- Get unique compact SSV string from state object or string
- Shorthand for [`ssv.edit("", state)`](#edit) if nonstring
- Delegates to [`ssv.yolo(state)`](#yolo) if string
- Optimal for conditional CSS classes

```js
ssv.state(state={})
```

```js
ssv.state("mark  tom  ") // "mark tom"
ssv.state({
  "mark travis": true,
  "matt": true,
  "tom scott": false
}) // "mark travis matt"

ssv.state({
  "mark": true,
  "mark travis": true,
  "travis": false
}) // "mark mark travis"
```

```js
let states = [/* objects or strings */]
ssv.yolo(states.map(ssv.state).join(" "))
```

### `xor`

Get unique values found in either `left` **or** `right` but **not** both

```js
ssv.xor(left="", right="")
```

```js
ssv.xor("", "mark mark") // "mark"
ssv.xor("mark tom", "mark") // "tom"
ssv.xor("mark tom", "travis") // "mark tom travis"
ssv.xor("mark tom", "travis tom") // "mark travis"
ssv.xor("mark tom", "matt  tom ") // "mark matt"
ssv.xor("mark tom tom", "mark mark") // "tom"
ssv.xor("mark mark", "tom tom") // "mark tom"
```

```js
let many = ["mark tom", "mark travis", "mark matt"]
many.reduce(ssv.xor) // "tom travis mark matt"
many.reduceRight(ssv.xor) // "matt travis mark tom"
```

### `yolo`

- Get unique SSV values
- Hella fast unique loop
- Be unique because yolo
- Case sensitive

```js
ssv.yolo(SSV="")
```

```js
ssv.yolo("tom tom travis") // "tom travis"
ssv.yolo("Na na na na   ") // "Na na"
ssv.yolo("Na na na na".toLowerCase()) // "na"
```
