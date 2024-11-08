export function unEntity(str) {
  return str.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
}

export function arrayToObject(input) {
  let output = {}
  input.length > 0 &&
    input.map((ele) => {
      output = { ...output, [ele['name']]: ele['value'] }
    })

  return output
}

export function nameToUsername(name) {
  return name.toLowerCase().replace(/[^a-z]+/g, '')
}

export function generatePassword() {
  let length = 8,
    charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
    password = ''
  for (let i = 0, n = charset.length; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n))
  }
  return password
}
