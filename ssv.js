/** @preserve npm.im/ssv */
!function(root, name, make) {
  typeof module != "undefined" && module.exports ? module.exports = make() : root[name] = make()
}(this, "ssv", function() {

  var $ = "$"
  var own = {}.hasOwnProperty
  var word = /\S+/g
  var space = " "
  var empty = ""

  function slate(set) {
    return null == set ? empty : empty + set
  }

  function match(set) {
    return slate(set).match(word)
  }

  function split(set) {
    return match(set) || []
  }

  function compact(set) {
    return split(set).join(space)
  }

  function count(set) {
    return split(set).length
  }

  function blank(set) {
    return !match(set)
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
    return !diff(search, set)
  }

  function at(set, i) {
    i = +i
    if (i !== i || i === i/0) return empty
    set = split(set)
    if (i < 0) i += set.length
    return set[i] || empty
  }

  function concat(set, more) {
    return compact(slate(set) + space + slate(more))
  }

  function union(set, more) {
    return uniq(slate(set) + space + slate(more))
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

  function swoop(set) {
    var s
    for (var key in set)
      if (own.call(set, key) && set[key])
        s ? s += space + key : s = key
    return s || empty
  }

  function edit(set, boss) {
    var yes = empty
    var noo = empty
    for (var key in boss)
      if (own.call(boss, key))
        boss[key]
          ? yes += space + key
          : noo += space + key
    set = noo ? diff(set, noo) : slate(set)
    return yes ? uniq(set + space + yes) : set
  }

  function state(set) {
    set = typeof set == "string" ? set : swoop(set)
    return set ? compact(set) : empty
  }

  function pod() {}
  function ssv(set) {
    var fresh = new pod
    fresh[$] = slate(set)
    return fresh
  }

  var chain = ssv.prototype = pod.prototype // proxy
  chain.constructor = ssv // mask pod
  chain.toString = chain.valueOf = function() {
    return this instanceof ssv ? slate(this[$]) : empty
  }

  function dot(fun) {
    return function(uno) {
      var was = this instanceof ssv ? this[$] : empty
      var got = fun(was, uno)
      return typeof got == "string" ? ssv(got) : got
    }
  }

  function give(f) {
    var method = f.name
    ssv[method] = f
    chain[method] = dot(f)
  }

  give(all)
  give(any)
  give(at)
  give(blank)
  give(compact)
  give(concat)
  give(count)
  give(diff)
  give(edit)
  give(meet)
  give(slate)
  give(split)
  give(state)
  give(swoop)
  give(union)
  give(uniq)
  give(xor)

  return ssv
})
