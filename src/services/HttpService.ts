export class HttpService {
  // switch between local and prod for api calls
  // prod vs development feature flag
  private static targetProd = false;

  // app URLs are provided below
  private static baseURL =
    HttpService.targetProd === true
      ? "https://avelraangame.azurewebsites.net/api/palantir/"
      : "https://localhost:5001/api/palantir/";

  // GET
  public static async httpGet(url: string): Promise<Response> {
    return fetch(`${HttpService.baseURL}${url}`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  // POST
  public static async httpPost(url: string, data: object): Promise<Response> {
    return fetch(`${HttpService.baseURL}${url}`, {
      method: "POST",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  // PUT
  public static async httpPut(url: string, data: object): Promise<Response> {
    return fetch(`${HttpService.baseURL}${url}`, {
      method: "PUT",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  // DELETE
  public static async httpDelete(
    url: string,
    data?: object
  ): Promise<Response> {
    return fetch(`${HttpService.baseURL}${url}`, {
      method: "DELETE",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
      },
      body: data !== null ? JSON.stringify(data) : "",
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }
}
