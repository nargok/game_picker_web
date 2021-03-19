import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000";
// axios.defaults.url = "http://localhost:5000";

axios.interceptors.response.use(
  response => response // レスポンスに成功したときの処理
  // UnprocessableEntityHandler.onRejected() //レスポンス受診に失敗したときの処理
);
