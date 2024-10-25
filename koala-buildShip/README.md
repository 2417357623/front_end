        const combineDependency = (obj) => {
            let object = deepClone(obj)
            let result = {}
            Object.entries(object).forEach(([key, value]) => {
                //value是个对象，把里面同样值的key合并到一起，形成新的数组
                Object.entries(value).forEach(([subKey, subValue]) => {
                    if (!result[subKey]) {
                        result[subKey] = []
                    }
                    result[subKey] = result[subKey].concat(subValue)
                })

            })
            return result
        }

        每次都只能深拷贝来对一个ref对象进行操作吗？？不然ref内部在拆开重新赋值的时候容易出现reactive代替obj的情况