import axios from "axios";
import { serverURL } from "./serverURL";

const overViewURL = axios.create({
  baseURL: serverURL + "/overview",
});

export default overViewURL;
