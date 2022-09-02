import axios from "axios";
import {User} from "../model/modelType";

const getUserList = () => {
  return axios.get<User[]>('/users').then(res => res.data);
}

const userApi = {getUserList};
export default userApi