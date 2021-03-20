import store from "@/store";
import {
  Module,
  VuexModule,
  getModule,
  Mutation,
  Action
} from "vuex-module-decorators";
import axios from "axios";
import { LoginParams } from "@/store/profile/profile.interface";

const setStorage = (profile: Record<string, any>) => {
  localStorage.setItem("profile", JSON.stringify(profile));
};

@Module({ dynamic: true, store, name: "profile", namespaced: true })
class ProfileModule extends VuexModule {
  // TODO 型定義
  private profile: Record<string, any> | null = null;

  public get loggedIn() {
    return localStorage.getItem("profile") ? true : false;
  }

  public get accessToken() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return JSON.parse(localStorage.getItem("profile")!).token;
  }

  @Mutation
  private saveProfile(profile: Record<string, any>) {
    this.profile = profile;
    setStorage(profile);
  }

  @Action
  public async signInAsync(loginParams: LoginParams) {
    // eslint-disable-next-line no-useless-catch
    try {
      axios
        .post("/auth/login", { ...loginParams }, { withCredentials: true })
        .then(response => {
          this.saveProfile(response.data);
        });
    } catch (error) {
      throw error;
    }
  }
}

export const profileStore = getModule(ProfileModule);
