!function(root, name, make) {
  typeof module != 'undefined' && module.exports ? module.exports = make() : root[name] = make()
}(this, 'ssv', function() {

  var api = {}
  var ssv = /\S+/g
  var empty = ''
  var space = ' '

  function match(string) {
    return string.match(ssv) || []
  }

  function compact(ssv) {
    return null == ssv ? empty : match(ssv).join(space)
  }

  function pad(string) {
    return space + string + space
  }

  function has(ssv, value) {
    return -1 < pad(compact(ssv)).indexOf(pad(value))
  }

  function add(ssv, value) {
    return ssv ? compact(ssv + space + value) : String(value)
  }

  function admit(ssv, value) {
    return has(ssv, value) ? compact(ssv) : add(ssv, value)
  }

  function remove(ssv, value) {
    return compact(ssv.replace(new RegExp('(^|\\s+)' + value + '(\\s+|$)'), space))
  }

  api['compact'] = compact
  api['has'] = has
  api['add'] = add
  api['admit'] = admit
  api['remove'] = remove
  return api
});
