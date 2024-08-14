import request from  '@/utils/request'

const getBatchInfo = (info) =>{
  return request.send("/BEDD00/query", info)
}

const  getProjectInfo = (info) =>{
  return request.send("/BEDD10/query", info)
}

const myApi = {
  getBatchInfo,
  getProjectInfo
}

export default myApi