//fetch version
const getAPI = {
  getAllAPI: function getAllAPI() {
    return fetch(
      "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6"
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (value) {
        return value;
      });
  },
};
//axios
import axios from "axios";
const api = axios.create({
  baseURL:
    "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Credentials": true,
});
export { getAPI, api };
