import { httpClient } from "../config/config";

export class productRest {
  getAll(params: any) {
    
    const baseUrl = "/correios"
    const path = `/cep`
    return httpClient.get(path, params, baseUrl)
  }
}
