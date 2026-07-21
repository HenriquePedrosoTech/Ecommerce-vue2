import { httpClient } from "../config/config";

export class productRest {
  getAll(params: any) {
   
    const path = "/products/"
    return httpClient.get(path, params)
  }
}
