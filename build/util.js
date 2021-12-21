function kebabCase2PascalCase(name) {
  name = name.replace(/-(\w)/g, (all, letter) => {
    return letter.toUpperCase()
  })
  return name.substr(0, 1).toUpperCase() + name.substr(1)
}

module.exports = {
  kebabCase2PascalCase
}
