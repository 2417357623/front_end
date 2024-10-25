//从一个对象中提取指定的key，返回一个新对象
const pickObj = (sourceObject, keysArray) =>
  keysArray.reduce((acc, key) => {
    if (sourceObject.hasOwnProperty(key)) {
      acc[key] = sourceObject[key] // 只提取存在于源对象的键
    }
    return acc
  }, {})

const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj))
}

//处理handleJsonData格式json数据的每一行数据,返回处理完的变量.需要传入callback(item,key)
const handleEveryRow = (obj, callback) => {
  return Object.entries(obj).reduce((accumulator, [key, productArray]) => {
    accumulator[key] = productArray.map((productItem) => callback(productItem, key))
    return accumulator // Combine results
  }, {})
}

//处理依赖dependencyData的每一行数据，返回处理完的变量,callback(item,key,subKey)
const handleDependencyRow = (obj, callback) => {
  return Object.entries(obj).reduce((acc, [key, productObj]) => {
    // 对每个 productObj 进行处理
    acc[key] = Object.entries(productObj).reduce((subAcc, [subKey, item]) => {
      subAcc[subKey] = callback(item, key, subKey) // 调用回调
      return subAcc // 返回累加的结果
    }, {})
    return acc // 返回累加的结果
  }, {})
}

const filterTableData = (obj, callback) => {
  return Object.entries(obj).reduce((accumulator, [key, productArray]) => {
    accumulator[key] = productArray.filter((productItem) => callback(productItem, key))
    return accumulator // Combine results
  }, {})
}

//找到某个特定key的数组，即为需要在表格中展示的某一制品的表格数据。这个key需要在constant配置中配置好。
const findArray = (targetKey, productInfo) => {
  // 检查当前对象是否是数组
  if (Array.isArray(productInfo)) {
    return null // 如果是数组，直接返回 null，因为我们找的是数组本身
  }

  // 遍历对象的每个属性
  for (const key in productInfo) {
    if (productInfo.hasOwnProperty(key)) {
      const value = productInfo[key]

      // 检查当前 key 是否匹配 targetKey 且值是一个数组
      if (key === targetKey && Array.isArray(value)) {
        return value // 找到第一个匹配的数组，直接返回
      }

      // 如果值是一个对象，递归搜索
      if (typeof value === 'object' && value !== null) {
        const result = findArray(targetKey, value)
        if (result) {
          return result // 如果在递归中找到匹配项，返回结果
        }
      }
    }
  }

  return null // 如果没有找到匹配的数组，返回 null
}

const addColumnVariable = (array, key, value) => {
  // 使用 map 方法为每个对象添加 uniqueCheckStatus
  //如果需要把变量应用在key上要加[]
  const updatedArray = array.map((item) => ({
    ...item, // 保留原有的属性
    [key]: value // 添加 newKey 属性
  }))

  return updatedArray
}

export { pickObj, deepClone, handleEveryRow, filterTableData, findArray, addColumnVariable,handleDependencyRow }
