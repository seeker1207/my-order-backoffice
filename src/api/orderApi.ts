import axios from "axios";
import {Order} from "../model/modelType";

axios.defaults.baseURL = 'http://13.209.35.46';


const getOrderList = () => {
  return axios.get<Order[]>('/orders').then(res => res.data)
}


export { getOrderList }