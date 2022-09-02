
interface Order {
  id: number,
  customerId: number,
  address1: string,
  address2: string,
  totalPrice: number,
  createdAt: string,
}

interface User {
  id: number,
  name: string,
  createdAt: string,
}
export type {Order, User}