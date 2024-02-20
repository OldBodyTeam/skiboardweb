// import { AxiosResponse, ResponseType } from 'axios';
import { Api } from './Api';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const ClientRequest = async () => {
  //   const token = await retrieveData();
  return new Api({
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InhpYW95dSIsInN1YiI6MSwiaWF0IjoxNzA4MzMyMTcwLCJleHAiOjE3MDgzNDY1NzB9.uM28o0KKaL9A588UsHaEKWS6ZrIn8w072mNLdlYkCho`,
    },
    baseURL: 'http://localhost:3000/',
  });
};

export { ClientRequest };
