import axios from "axios";
import {Order} from "../model/modelType";

const getOrderList = () => {
  return axios.get<Order[]>('/orders').then(res => res.data);
}

const orderApi = {getOrderList}
export default orderApi;