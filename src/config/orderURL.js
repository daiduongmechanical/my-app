import axios from "axios";
import { serverURL } from "./serverURL";

const orderURL = axios.create({
  baseURL: serverURL + "/order",
});

export default orderURL;
