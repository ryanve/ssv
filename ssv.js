/** @preserve npm.im/ssv */
!function(root) {
  var ssv = {}
  var own = {}.hasOwnProperty
  var word = /\S+/g
  var space = " "
  var empty = ""

  function say(set) {
    return set == null ? empty : empty + set
  }

  function match(set) {
    return say(set).match(word)
  }

  function split(set) {
    return match(set) || []
  }

  function jam(set) {
    return split(set).join(space)
  }

  function count(set) {
    return split(set).length
  }

  function blank(set) {
    return !match(set)
  }

  function any(set, search) {
    return count(not(set, search)) < count(set)
  }

  function all(set, search) {
    return !not(search, set)
  }

  function at(set, i) {
    i = +i
    if (i != i || i == i/0) return empty
    set = split(set)
    if (i < 0) i += set.length
    return set[i] || empty
  }

  function gum(set, more) {
    return jam(say(set) + space + say(more))
  }

  function or(set, more) {
    return yolo(say(set) + space + say(more))
  }

  function xor(left, right) {
    return or(
      not(left, right),
      not(right, left))
  }

  function and(left, right) {
    return not(
      yolo(left),
      xor(left, right))
  }

  function yolo(set) {
    set = split(set)
    var n = 0
    var u = []
    var l = set.length
    var i = 0
    outer:while (i < l) {
      var v = set[i++]
      var j = n
      while (j--)
        if (u[j] === v)
          continue outer
      u[n++] = v
    }
    return u.join(space)
  }

  function not(set, less) {
    var d = empty
    set = split(set)
    less = split(less)
    var n = set.length
    var l = less.length
    var j = 0
    outer:while (j < n) {
      var i = l
      var v = set[j++]
      while (i--)
        if (v === less[i])
          continue outer
      d ? d += space + v : d = v
    }
    return d
  }

  function edit(set, boss) {
    var yes = empty
    var noo = empty
    if (typeof boss == "string")
      yes = boss
    else for (var key in boss)
      if (own.call(boss, key))
        boss[key]
          ? yes += space + key
          : noo += space + key
    var eco = set === yes
    var emo = set === empty
    var ace = eco || emo || !noo
    set = ace ? set : not(set, noo)
    return !yes || eco
      ? emo ? set : yolo(set)
      : or(set, yes)
  }

  function state(set) {
    return edit(empty, set)
  }

  function give(f) {
    var method = f.name
    ssv[method] = f
  }

  give(all)
  give(and)
  give(any)
  give(at)
  give(blank)
  give(count)
  give(edit)
  give(gum)
  give(jam)
  give(not)
  give(or)
  give(say)
  give(split)
  give(state)
  give(xor)
  give(yolo)

  typeof module != "undefined"
    && module.exports
    ? module.exports = ssv
    : root["ssv"] = ssv
}(this)
