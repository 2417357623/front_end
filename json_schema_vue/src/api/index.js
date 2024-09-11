import request from '@/utils/request';
import interfaceRequest from '@/utils/interfaceRequest';
import uploadRequest from '@/utils/uploadRequest.js';

const getBatchInfo = (info) => {
  return request.send('/BEDD00/query', info);
};

const getAreaInfo = (info) => {
  return request.send('/S_BE_DF_3201', info);
};

const getProjectInfo = (info) => {
  return request.send('/BEDD00/queryWorkSpaceNameList', info);
};

const getConnectInfo = (info) => {
  return request.send('/BEDD00LY/queryConnect', info);
};

const packProduct = (info) => {
  return interfaceRequest.send('importAndExport/exportConfigForPack', info);
};

const uniqueCheck = (info) =>{
  return request.send('BEDD00LY/uniqueCheck', info)
}

const dependencyCheck = (info) =>{
  return request.send('BEDD00LY/dependencyCheck', info)
}

const getStoragePositionFromDataDictionary = (info) =>{
  return request.send('BEDP0001/getStoragePositionFromDataDictionary', info)
}

const generateProduct = (info) =>{
  return request.send('BEDD00LY/generateProduct', info)
}

const myApi = {
  getBatchInfo,
  getProjectInfo,
  packProduct,
  getAreaInfo,
  uniqueCheck,
  dependencyCheck,
  getStoragePositionFromDataDictionary,
  generateProduct,
  getConnectInfo
};

export default myApi;