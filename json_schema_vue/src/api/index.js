import request from  '@/utils/request'
import interfaceRequest from '@/utils/interfaceRequest'

const getBatchInfo = (info) =>{
  return request  .send("/BEDD00/query", info)
}

const  getProjectInfo = (info) =>{
  return request.send("/BEDD00/queryWorkSpaceNameList", info)
}

const  packProduct = (info) =>{
  return interfaceRequest.send("importAndExport/exportConfigForPack", info)
}

const myApi = {
  getBatchInfo,
  getProjectInfo,
  packProduct
}

export default myApi