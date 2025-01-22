export default {
  // 哪些檔案要進行編譯
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  // 測試運行的環境：jsdom => 在模擬的瀏覽器環境
  testEnvironment: "jsdom",
};
