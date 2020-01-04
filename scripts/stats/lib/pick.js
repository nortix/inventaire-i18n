module.exports = (obj, props) => {
  const picked = {}
  props.forEach(prop => {
    picked[prop] = obj[prop]
  })
  return picked
}
