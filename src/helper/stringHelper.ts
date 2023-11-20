const removeSpace = (name: string) => {
  let result = ""
  for (let i = 0; i < name.length; i++) {
    if (
      (name[i] >= "0" && name[i] <= "9") ||
      ((name[i] >= "a" || name[i] >= "A") && (name[i] <= "z" || name[i] <= "Z"))
    ) {
      result += name[i]
    } else if (name[i] === " ") {
      result += "-"
    }
  }
  return result
}

export { removeSpace }
