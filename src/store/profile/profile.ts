import store from "@/store";
import {
  Module,
  VuexModule,
  getModule,
  Mutation,
  Action
} from "vuex-module-decorators";
import axios from "axios";

const setStorage = (profile: Record<string, any>) => {
  localStorage.setItem("profile", JSON.stringify(profile));
};

@Module({ dynamic: true, store, name: "profile", namespaced: true })
class ProfileModule extends VuexModule {
  // TODO 型定義
  public profile: Record<string, any> | null = null;

  @Mutation
  private saveProfile(profile: Record<string, any>) {
    this.profile = profile;
    setStorage(profile);
  }

  @Action
  public async signInAsync(loginParams: Record<string, any>) {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.post("/auth/login", {
        ...loginParams
      });
      this.saveProfile(response.data);
    } catch (error) {
      throw error;
    }
  }
}

export const profileStore = getModule(ProfileModule);
