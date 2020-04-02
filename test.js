var api = require("./")
var assert = require("assert")

assert.strictEqual(api.split("").length, 0)
assert.strictEqual(api.split(" ").length, 0)
assert.strictEqual(api.split("mark").join("-"), "mark")
assert.strictEqual(api.split("mark tom").join("-"), "mark-tom")
assert.strictEqual(api.split(" mark tom ").join("-"), "mark-tom")
console.log("#split tests passed")

assert.strictEqual(api.compact(""), "")
assert.strictEqual(api.compact("    "), "")
assert.strictEqual(api.compact("  mark  tom  travis  "), "mark tom travis")
assert.strictEqual(api.compact("\n mark \r tom \t travis \n\r\t"), "mark tom travis")
console.log("#compact tests passed")

assert.strictEqual(api.count(""), 0)
assert.strictEqual(api.count("    "), 0)
assert.strictEqual(api.count("blink"), 1)
assert.strictEqual(api.count("mark-hoppus matt-skiba"), 2)
assert.strictEqual(api.count("  mark  matt  travis  "), 3)
assert.strictEqual(api.count(" blink blink blink 182"), 4)
console.log("#count tests passed")

assert.doesNotThrow(function() { api.all(null, " ") })
assert.strictEqual(api.all("", ""), true)
assert.strictEqual(api.all("", " "), true)
assert.strictEqual(api.all(" ", " "), true)
assert.strictEqual(api.all("mark tom", ""), true)
assert.strictEqual(api.all("mark tom", " "), true)
assert.strictEqual(api.all("mark tom", "tom"), true)
assert.strictEqual(api.all("mark tom", "mark"), true)
assert.strictEqual(api.all("mark tom", "travis"), false)
assert.strictEqual(api.all("  mark   tom  ", "mark  tom"), true)
assert.strictEqual(api.all("  mark   tom  ", "mark scott"), false)
assert.strictEqual(api.all("  mark   tom ", "matt travis"), false)
assert.strictEqual(api.all("  mark   tom  mark", "travis tom"), false)
console.log("#all tests passed")

assert.doesNotThrow(function() { api.any(null, " ") })
assert.strictEqual(api.any("", ""), false)
assert.strictEqual(api.any("", " "), false)
assert.strictEqual(api.any(" ", " "), false)
assert.strictEqual(api.any("mark tom", ""), false)
assert.strictEqual(api.any("mark tom", " "), false)
assert.strictEqual(api.any("mark tom", "tom"), true)
assert.strictEqual(api.any("mark tom", "mark"), true)
assert.strictEqual(api.any("mark tom", "travis"), false)
assert.strictEqual(api.any("  mark   tom  ", "mark  tom"), true)
assert.strictEqual(api.any("  mark   tom  ", "mark scott"), true)
assert.strictEqual(api.any("  mark   tom ", "matt travis"), false)
assert.strictEqual(api.any("  mark   tom  mark", "travis tom"), true)
console.log("#any tests passed")

assert.strictEqual(api.blank("travis"), false)
assert.strictEqual(api.blank("      "), true)
assert.strictEqual(api.blank(""), true)
console.log("#blank tests passed")

assert.strictEqual(api.concat("", ""), "")
assert.strictEqual(api.concat("", "mark"), "mark")
assert.strictEqual(api.concat("mark tom", "travis"), "mark tom travis")
assert.strictEqual(api.concat("mark tom", "travis matt"), "mark tom travis matt")
assert.strictEqual(api.concat("mark tom", "mark"), "mark tom mark")
assert.strictEqual(api.concat("  mark  tom  ", "  travis  matt "), "mark tom travis matt")
assert.strictEqual(api.concat("  mark  tom  ", "mark"), "mark tom mark")
console.log("#concat tests passed")

assert.strictEqual(api.uniq(""), "")
assert.strictEqual(api.uniq("mark tom mark"), "mark tom")
assert.strictEqual(api.uniq("mark tom mark mark tom tom mark"), "mark tom")
assert.strictEqual(api.uniq("mark tom Mark"), "mark tom Mark")
console.log("#uniq tests passed")

assert.strictEqual(api.union("", ""), "")
assert.strictEqual(api.union("", "mark"), "mark")
assert.strictEqual(api.union("mark tom", "travis"), "mark tom travis")
assert.strictEqual(api.union("mark tom", "travis matt"), "mark tom travis matt")
assert.strictEqual(api.union("mark tom", "mark"), "mark tom")
assert.strictEqual(api.union("  mark  tom  ", "  travis  matt "), "mark tom travis matt")
assert.strictEqual(api.union("  mark  tom  ", "mark"), "mark tom")
assert.strictEqual(api.union("mark mark mark", ""), "mark")
assert.strictEqual(api.union("mark mark mark", "tom"), "mark tom")
console.log("#union tests passed")

assert.strictEqual(api.meet("", ""), "")
assert.strictEqual(api.meet("", "mark"), "")
assert.strictEqual(api.meet("mark matt travis", "tom scott"), "")
assert.strictEqual(api.meet("mark tom tom", "mark tom travis"), "mark tom")
assert.strictEqual(api.meet("tom tom tom scott", "tom travis scott"), "tom scott")
console.log("#meet tests passed")

assert.strictEqual(api.diff("", ""), "")
assert.strictEqual(api.diff("", "mark"), "")
assert.strictEqual(api.diff("mark tom", "travis"), "mark tom")
assert.strictEqual(api.diff("mark tom", "travis tom"), "mark")
assert.strictEqual(api.diff("mark tom", "mark"), "tom")
assert.strictEqual(api.diff("  mark tom  ", " travis  tom "), "mark")
assert.strictEqual(api.diff("  mark tom tom", "mark mark"), "tom tom")
assert.strictEqual(api.diff("mark mark mark", ""), "mark mark mark")
assert.strictEqual(api.diff("mark mark", "tom tom"), "mark mark")
assert.strictEqual(api.diff("mark tom travis matt", "tom matt"), "mark travis")
assert.strictEqual(api.diff("mark tom tom tom", "tom"), "mark")
assert.strictEqual(api.diff("mark tom tom tom", "tom travis"), "mark")
assert.strictEqual(api.diff("mark tom tom tom", "tom travis tom"), "mark")
console.log("#diff tests passed")

assert.strictEqual(api.complete("", ""), "")
assert.strictEqual(api.complete("", "tom"), "tom")
assert.strictEqual(api.complete("tom tom", ""), "tom tom")
assert.strictEqual(api.complete("mark tom", "mark"), "mark tom")
assert.strictEqual(api.complete("mark tom", "mark mark"), "mark tom")
assert.strictEqual(api.complete("mark tom", "travis"), "mark tom travis")
assert.strictEqual(api.complete("mark tom travis", "travis"), "mark tom travis")
assert.strictEqual(api.complete("mark tom", "travis travis"), "mark tom travis")
assert.strictEqual(api.complete("mark tom tom", "travis"), "mark tom tom travis")
assert.strictEqual(api.complete("  mark  tom  ", "  travis  "), "mark tom travis")
assert.strictEqual(api.complete("  mark  tom  ", "tom"), "mark tom")
assert.strictEqual(api.complete("mark mark", "tom tom"), "mark mark tom")
console.log("#complete tests passed")

assert.strictEqual(api.xor("", ""), "")
assert.strictEqual(api.xor("", "mark"), "mark")
assert.strictEqual(api.xor("mark tom", "mark"), "tom")
assert.strictEqual(api.xor("mark tom", "travis"), "mark tom travis")
assert.strictEqual(api.xor("mark tom", "travis tom"), "mark travis")
assert.strictEqual(api.xor("  mark tom  ", " matt  tom "), "mark matt")
assert.strictEqual(api.xor("  mark tom tom", "mark mark"), "tom")
assert.strictEqual(api.xor("mark mark mark", ""), "mark")
assert.strictEqual(api.xor("mark mark", "tom tom"), "mark tom")
assert.strictEqual(api.xor("mark tom travis matt", "tom matt"), "mark travis")
console.log("#xor tests passed")

assert.strictEqual(api.state(""), "")
assert.strictEqual(api.state(" "), "")
assert.strictEqual(api.state({}), "")
assert.strictEqual(api.state(api.state("mark")), "mark")
assert.strictEqual(api.state(api.state(" tom ")), "tom")
assert.strictEqual(api.state(api.state(" mark matt ")), "mark matt")
assert.strictEqual(api.state(api.state("travis travis")), "travis travis")
assert.strictEqual(api.state({
  "mark travis": true,
  "matt": true,
  "tom scott": false
}), "mark travis matt")
assert.strictEqual(api.state({
  " mark travis ": true,
  " matt ": true,
  " tom scott ": false,
  " ": true,
}), "mark travis matt")
assert.strictEqual(api.state({
  "mark": true,
  "mark travis": true,
  "travis": false
}), "mark mark travis")
console.log("#state tests passed")

console.log("All tests passed =)")
