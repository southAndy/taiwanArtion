export const getAPI = {
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
