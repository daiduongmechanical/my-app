import axios from "axios";
import { serverURL } from "./serverURL";

const dishURL = axios.create({
  baseURL: serverURL + "/menu",
});

export default dishURL;
