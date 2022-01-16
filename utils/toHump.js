const toHump = async (ctx, next) => {
    ctx.write = (obj) => {
        ctx.body = toHumpFun(obj)
    }
    await next()
}

function toHumpFun(obj) {
    const result = Array.isArray(obj) ? [] : {}
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const element = obj[key];
            const index = key.indexOf('_')
            let newKey = key
            if (index === -1 || key.length === 1) {
                result[key] = element
            } else {
                const keyArr = key.split('_')
                const newKeyArr = keyArr.map((item, index) => {
                    if (index === 0) return item
                    return item.charAt(0).toLocaleUpperCase() + item.slice(1)
                })
                newKey = newKeyArr.join('')
                result[newKey] = element
            }

            if (typeof element === 'object' && element !== null) {
                result[newKey] = toHumpFun(element)
            }
        }
    }
    return result
}

module.exports = toHump