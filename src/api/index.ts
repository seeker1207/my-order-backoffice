import axios from "axios";
import orderApi from "./orderApi";
import userApi from "./userApi";

axios.defaults.baseURL = 'http://13.209.35.46';

export { orderApi, userApi }

