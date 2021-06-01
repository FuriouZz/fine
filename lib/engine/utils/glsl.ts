interface InterpolationData {
  attribute: string | number;
  operation: 'exists' | 'equals' | 'notequals' | 'print';
  index: number;
  partial: string;
}

type Sections = Record<string, (string | ((params: Params) => string))[]>
type Params = Record<string, string|number|boolean>

const IfReg = /^if\s/
const IfDefReg = /^ifdef\s/
const ElseReg = /^else$/
const EndIfReg = /^endif$/
const NegReg = /^!/

function interpolate(data: InterpolationData, obj: Params) {
  switch (data.operation) {
    case "exists": {
      if (obj.hasOwnProperty(data.attribute)) {
        return data.partial
      }
      return ''
    }
    case "equals": {
      if (obj[data.attribute]) {
        return data.partial
      }
      return ''
    }
    case "notequals": {
      if (!obj[data.attribute]) {
        return data.partial
      }
      return ''
    }
    case "print": {
      const value = obj[data.attribute] === undefined
        ? ''
        : obj[data.attribute]
      return value + data.partial
    }
  }
}

function parse(sections: Sections, strs: TemplateStringsArray, keys: (string | number)[]) {
  const interpolations: InterpolationData[] = []

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    const index = i + 1

    if (typeof key === 'string') {
      key = key.trim()

      if (IfReg.test(key)) {
        const attribute = key.replace(IfReg, '').trim()
        const operation = NegReg.test(attribute) ? 'notequals' : 'equals'

        interpolations.push({
          attribute: attribute.replace(NegReg, ''),
          operation,
          index,
          partial: strs[index],
        })
      } else if (IfDefReg.test(key)) {
        const attribute = key.replace(IfReg, '').trim()
        interpolations.push({
          attribute,
          operation: 'exists',
          index,
          partial: strs[index],
        })
      } else if (ElseReg.test(key) && interpolations[interpolations.length - 1]) {
        const condition = interpolations[interpolations.length - 1]
        interpolations.push({
          attribute: condition.attribute,
          operation: condition.operation === 'equals'
            ? 'notequals'
            : 'equals',
          index,
          partial: strs[index]
        })
      } else {
        interpolations.push({
          attribute: key,
          operation: 'print',
          index,
          partial: strs[index]
        })
      }
    } else {
      interpolations.push({
        attribute: key,
        operation: 'print',
        index,
        partial: strs[index]
      })
    }
  }


  let currentPass: string = null

  const pushLine = (line: string | ((params: Params) => string)) => {
    if (currentPass) {
      sections[currentPass] = sections[currentPass] || []
      sections[currentPass].push(line)
    }
  }

  for (let i = 0; i < strs.length; i++) {
    const str = strs[i]
    const index = i - 1
    const hasNoKey = !keys[index]

    if (!hasNoKey) {
      const data = interpolations.find(({ index }) => index === i)
      if (data) {
        pushLine(obj => interpolate(data, obj))
        continue
      }
    }

    const lines = str.replace(/\r\n/g, '\n').split(/\n/g)

    for (const index in lines) {
      const line = lines[index]

      if (line.match(/^-{2}\s.+$/)) {
        const match = line.match(/(\w|\.)+/)
        if (match !== null) {
          currentPass = match[0]
          continue;
        }
      }

      pushLine(line)
    }
  }
}

export function glsl(strs: TemplateStringsArray, ...keys: (string | number)[]) {
  const sections: Sections = {}
  let parsed = false
  return (entry: string, params: Params = {}) => {
    if (!parsed) {
      parse(sections, strs, keys)
      parsed = true
    }

    return sections[entry]
      .map(line => {
        if (typeof line === 'function') {
          return line(params)
        }
        return line
      })
      .filter(l => l !== '')
      .join('\n')
  }
}