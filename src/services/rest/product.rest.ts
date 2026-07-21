import { httpClient } from "../config/config";

export class productRest {
  getAll(params: any) {
    // Voltamos para a rota base, mas adicionando a barra para evitar o conflito de UUID
    const path = "/products/"
    return httpClient.get(path, params)
  }
}
