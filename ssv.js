!function(root, name, make) {
  typeof module != "undefined" && module.exports ? module.exports = make() : root[name] = make()
}(this, "ssv", function() {

  var api = {}
  var word = /\S+/g
  var space = " "
  var empty = ""

  function split(string) {
    return string.match(word) || []
  }

  function count(string) {
    var found = string.match(word)
    return found ? found.length : 0
  }

  function compact(ssv) {
    return split(ssv).join(space)
  }

  function any(ssv, search) {
    search = split(search)
    var l = search.length
    if (!l) return false
    ssv = split(ssv)
    var n = ssv.length
    for (var j = 0; j < n; j++) {
      for (var i = 0; i < l; i++) {
        if (ssv[j] === search[i]) {
          return true
        }
      }
    }
    return false
  }

  function all(ssv, search) {
    search = split(search)
    var l = search.length
    if (!l) return true
    ssv = split(ssv)
    var n = ssv.length
    ask:for (var i = 0; i < l; i++) {
      for (var j = 0; j < n; j++) if (ssv[j] === search[i]) continue ask
      return false
    }
    return true
  }

  function concat(ssv, more) {
    return compact(ssv + space + more)
  }

  function union(ssv, more) {
    return uniq(concat(ssv, more))
  }

  function xor(left, right) {
    return union(diff(left, right), diff(right, left))
  }

  function meet(left, right) {
    return diff(union(left, right), xor(left, right))
  }

  function uniq(ssv) {
    ssv = split(ssv)
    var u = []
    var l = ssv.length
    outer:for (var i = 0; i < l; i++) {
      for (var j = u.length; j--;) if (ssv[i] === u[j]) continue outer
      u.push(ssv[i])
    }
    return u.join(space)
  }

  function diff(ssv, less) {
    less = split(less)
    var l = less.length
    if (!l) return compact(ssv)
    ssv = split(ssv)
    var n = ssv.length
    if (!n) return empty
    var r = []
    var i = 0
    var skip = {}
    while (i < l) skip[less[i++]] = less
    for (i = 0; i < n; i++) {
      if (skip[ssv[i]] !== less) {
        r.push(ssv[i])
      }
    }
    return r.join(space)
  }

  api["all"] = all
  api["any"] = any
  api["compact"] = compact
  api["concat"] = concat
  api["count"] = count
  api["diff"] = diff
  api["meet"] = meet
  api["split"] = split
  api["union"] = union
  api["uniq"] = uniq
  api["xor"] = xor
  return api
});
