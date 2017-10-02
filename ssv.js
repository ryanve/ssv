!function(root, name, make) {
  typeof module != 'undefined' && module.exports ? module.exports = make() : root[name] = make()
}(this, 'ssv', function() {

  var vacant
  var api = {}
  var word = /\S+/g
  var space = ' '
  var empty = ''

  function split(string) {
    return string.match(word) || []
  }

  function compact(ssv) {
    return split(ssv).join(space)
  }

  function pad(string) {
    return space + string + space
  }

  function has(ssv, value) {
    if (!ssv.match(word)) return false
    return -1 < pad(compact(ssv)).indexOf(pad(value))
  }

  function pop(ssv) {
    return split(ssv).pop() || empty
  }

  function concat(ssv, more) {
    return compact(ssv + space + more)
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

  function slice(ssv, begin, end) {
    ssv = split(ssv)
    if (vacant === begin) begin = 0
    if (vacant === end) end = ssv.length
    return ssv.slice(begin, end).join(space)
  }

  function push(ssv, value) {
    ssv = split(ssv)
    ssv.push(value)
    return ssv.join(space)
  }

  function add(ssv, value) {
    return has(ssv, value) ? compact(ssv) : push(ssv, value)
  }

  function remove(ssv, value) {
    ssv = pad(compact(ssv)).replace(pad(value), space)
    return has(ssv, value) ? remove(ssv, value) : compact(ssv)
  }


  api['add'] = add
  api['compact'] = compact
  api['concat'] = concat
  api['has'] = has
  api['parse'] = split // alias
  api['pop'] = pop
  api['push'] = push
  api['remove'] = remove
  api['slice'] = slice
  api['split'] = split
  api['uniq'] = uniq
  return api
});
