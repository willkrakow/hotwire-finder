import { Axios } from "axios";
import { Poi } from "../types";

const APIKEY = "rw3ybx7e6uq9m7dw44nwmbjw";
const SIG = "14ec5f202fa094aa6482c260d2b5d484";
const client = new Axios({
  baseURL: "https://api.hotwire.com/v1",
  params: {
    apikey: APIKEY,
    sig: SIG,
  },
});

const getPois = async (resultId: string): Promise<Poi[]> => {
  const { data } = await client.get(`/poi/resultId/${resultId}`);
  const { pois } = JSON.parse(data);
  return pois;
};

const hotwireService = {
  getPois,
};

export { hotwireService };
