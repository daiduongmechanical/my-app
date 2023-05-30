import axios from "axios";
import { serverURL } from "./serverURL";

const warehouseURL = axios.create({
  baseURL: serverURL + "/warehouse",
});

export default warehouseURL;
