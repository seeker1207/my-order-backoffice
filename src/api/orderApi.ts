import axios from "axios";
import {Order} from "../model/modelType";

interface inputOrderType {
  customerId: number,
  address1: string,
  address2: string,
  totalPrice: number
}

const getOrderList = () => {
  return axios.get<Order[]>('/orders').then(res => res.data);
}

const saveOrder = (targetOrder: inputOrderType) => {
  return axios.post<Order>('/orders', targetOrder).then(res => res.data);
}

const modifyOrder = (targetOrder: inputOrderType, orderId: number) => {
  return axios.put<Order>(`/orders/${orderId}`, targetOrder).then(res => res.data);
}

const orderApi = {getOrderList, saveOrder, modifyOrder}
export default orderApi;