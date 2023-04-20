import axios from "axios";
import { serverURL } from "./serverURL";

const discountURL = axios.create({
  baseURL: serverURL + "/discount",
});

export default discountURL;
