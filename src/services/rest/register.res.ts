import { HttpClient, type IHttp } from "../config/config";



export class RegisterRest {

  constructor(private httpClient: IHttp = new HttpClient()) {}



  async register(body: { name: string; email: string; password: string }): Promise<any> {

    const path = '/auth/register';

    return await this.httpClient.post(path, body);

  }

}
