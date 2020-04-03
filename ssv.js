/** @preserve npm.im/ssv */
!function(root, name, make) {
  typeof module != "undefined" && module.exports ? module.exports = make() : root[name] = make()
}(this, "ssv", function() {

  var ssv = {}
  var own = {}.hasOwnProperty
  var word = /\S+/g
  var space = " "
  var empty = ""

  function split(set) {
    return set.match(word) || []
  }

  function compact(set) {
    return split(set).join(space)
  }

  function count(set) {
    return split(set).length
  }

  function blank(set) {
    return !set.match(word)
  }

  function any(set, search) {
    search = split(search)
    var l = search.length
    if (!l) return false
    set = split(set)
    var n = set.length
    var j = 0
    while (j < n) {
      var i = l
      var v = set[j++]
      while (i--) if (v === search[i]) return true
    }
    return false
  }

  function all(set, search) {
    return blank(search) || !diff(search, set)
  }

  function at(set, i) {
    i = +i
    if (i !== i || i === i/0) return empty
    set = split(set)
    if (i < 0) i += set.length
    return set[i] || empty
  }

  function concat(set, more) {
    return compact(set + space + more)
  }

  function need(set, more) {
    return compact(set + space + diff(more, set))
  }

  function union(set, more) {
    return uniq(set + space + more)
  }

  function xor(left, right) {
    return union(diff(left, right), diff(right, left))
  }

  function meet(left, right) {
    return diff(union(left, right), xor(left, right))
  }

  function uniq(set) {
    set = split(set)
    var n = 0
    var u = []
    var l = set.length
    outer:for (var i = 0; i < l; i++) {
      for (var j = n; j--;) if (set[i] === u[j]) continue outer
      u[n++] = set[i]
    }
    return u.join(space)
  }

  function diff(set, less) {
    var d = empty
    set = split(set)
    less = split(less)
    var n = set.length
    var l = less.length
    var j = 0
    outer:while (j < n) {
      var i = l
      var v = set[j++]
      while (i--) if (v === less[i]) continue outer
      d ? d += space + v : d = v
    }
    return d
  }

  function state(state) {
    var s
    if (typeof state == "string") s = state
    else for (var key in state) {
      if (own.call(state, key)) {
        if (state[key]) {
          if (s) s += space + key
          else s = key
        }
      }
    }
    return s ? compact(s) : empty
  }

  ssv["all"] = all
  ssv["any"] = any
  ssv["at"] = at
  ssv["blank"] = blank
  ssv["compact"] = compact
  ssv["need"] = need
  ssv["concat"] = concat
  ssv["count"] = count
  ssv["diff"] = diff
  ssv["meet"] = meet
  ssv["split"] = split
  ssv["state"] = state
  ssv["union"] = union
  ssv["uniq"] = uniq
  ssv["xor"] = xor
  return ssv
});
