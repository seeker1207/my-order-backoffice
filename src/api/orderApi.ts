import axios from "axios";
import {Order} from "../model/modelType";

interface postOrderType {
  customerId: number,
  address1: string,
  address2: string,
  totalPrice: number
}

const getOrderList = () => {
  return axios.get<Order[]>('/orders').then(res => res.data);
}

const postOrder = (targetOrder: postOrderType) => {
  return axios.post<Order[]>('/orders').then(res => res.data);
}

const orderApi = {getOrderList, postOrder}
export default orderApi;