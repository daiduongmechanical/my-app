import axios from "axios";
import { serverURL } from "./serverURL";

const cartURL = axios.create({
  baseURL: serverURL + "/cart",
});

export default cartURL;
