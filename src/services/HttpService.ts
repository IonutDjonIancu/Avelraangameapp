export class HttpService {
  // switch between local and prod for api calls
  // private static baseURL: string = "https://localhost:5001/api/palantir/";
  private static baseURL: string =
    "https://avelraangame.azurewebsites.net/api/palantir/";

  public static async httpGet(url: string): Promise<Response> {
    const response = await fetch(`${HttpService.baseURL}${url}`, {
      method: "GET",
      mode: "no-cors",
    });

    if (!response.ok) {
      throw new Error(`GET request failed: ${response}`);
    }

    return response;
  }

  public static async httpPost(url: string, data: Object): Promise<Response> {
    const response = await fetch(`${(HttpService.baseURL, url)}`, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`POST request failed: ${response}`);
    }

    return response;
  }

  public static async httpPut(url: string, data: Object): Promise<Response> {
    const response = await fetch(`${(HttpService.baseURL, url)}`, {
      method: "PUT",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`PUT request failed: ${response}`);
    }

    return response;
  }
}
