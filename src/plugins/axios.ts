import axios from "axios";
import { profileStore } from "@/store/profile/profile";

axios.defaults.baseURL = "http://localhost:5000";
// axios.defaults.url = "http://localhost:5000";

axios.interceptors.request.use(config => {
  const token = profileStore.accessToken;
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

axios.interceptors.response.use(
  response => response // レスポンスに成功したときの処理
  // UnprocessableEntityHandler.onRejected() //レスポンス受診に失敗したときの処理
);
