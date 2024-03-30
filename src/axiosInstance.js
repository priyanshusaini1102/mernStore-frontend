// axiosInstance.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mernstore-backend-otyu.onrender.com', // Set your backend domain here
});

const fun = async() => {
  const products = await instance.get('/api/v1/products')
  console.log(products)

}
fun()


export default instance;
