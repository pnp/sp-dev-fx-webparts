module.exports = on
module.exports.on = on
module.exports.off = off

function on (element, event, callback, capture) {
  !element.addEventListener && (event = 'on' + event)
  ;(element.addEventListener || element.attachEvent).call(element, event, callback, capture)
  return callback
}

function off (element, event, callback, capture) {
  !element.removeEventListener && (event = 'on' + event)
  ;(element.removeEventListener || element.detachEvent).call(element, event, callback, capture)
  return callback
}
