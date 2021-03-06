import store from "@/store";
import {
  Module,
  VuexModule,
  getModule,
  Mutation,
  Action
} from "vuex-module-decorators";
import axios from "axios";

@Module({ dynamic: true, store, name: "game", namespaced: true })
class GameModule extends VuexModule {
  // TODO 型定義
  private games: Record<string, any>[] = [];

  // getterは？
  public get getGames() {
    return this.games;
  }

  @Mutation
  private setGames(games: Record<string, any>[]) {
    this.games = games;
  }

  @Action
  public async getGameList() {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.get("/games");
      this.setGames(response.data);
    } catch (error) {
      throw error;
    }
  }
}

export const gameStore = getModule(GameModule);
