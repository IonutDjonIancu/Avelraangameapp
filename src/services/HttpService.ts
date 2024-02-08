import { PlayerInfo } from "@/dtos/Dtos";

export class HttpService {
  // switch between local and prod for api calls
  // prod vs development feature flag
  private static targetProd = true;

  // app URLs are provided below
  private static baseURL =
    HttpService.targetProd === true
      ? "https://avelraangame.azurewebsites.net/api/palantir/"
      : "https://localhost:5001/api/palantir/";

  // GET
  public static async httpGetMetadata(url: string): Promise<Response> {
    return fetch(`${this.baseURL}${url}`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error(err.message);
        return err;
      });
  }

  // GET
  public static async httpGet(url: string): Promise<Response> {
    return fetch(this.getComposedURL(url))
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error(err.message);
        return err;
      });
  }

  // POST-noIdentity
  public static async httpPostNoIdentity(
    url: string,
    data: object
  ): Promise<Response> {
    return fetch(`${this.baseURL}${url}`, {
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

  // POST
  public static async httpPost(url: string, data: object): Promise<Response> {
    return fetch(this.getComposedURL(url), {
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

  // PUT-noIdentity
  public static async httpPutNoIdentity(
    url: string,
    data: object
  ): Promise<Response> {
    return fetch(`${this.baseURL}${url}`, {
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

  // PUT
  public static async httpPut(url: string, data: object): Promise<Response> {
    return fetch(this.getComposedURL(url), {
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

  private static getComposedURL = (url: string): string => {
    const playerInfo = this.identifyPlayer();

    return `${this.baseURL}${url}?playerName=${playerInfo.playerName}&token=${playerInfo.playerToken}`;
  };

  private static identifyPlayer = (): PlayerInfo => {
    const playerName = localStorage.getItem("playerName");
    const playerToken = localStorage.getItem("playerToken");

    if (!playerName || !playerToken) {
      console.error("Missing player name or token from local storage.");
      return;
    }

    return { playerName: playerName, playerToken: playerToken };
  };
}
