import store from "@/store";
import {
  Module,
  VuexModule,
  getModule,
  Mutation,
  Action
} from "vuex-module-decorators";
import axios from "axios";
import { GameListItem } from "@/store/game/game.interface";

@Module({ dynamic: true, store, name: "game", namespaced: true })
class GameModule extends VuexModule {
  private games: GameListItem[] = [];

  public get getGames() {
    return this.games;
  }

  @Mutation
  private setGames(games: GameListItem[]) {
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

  @Action async createGame(createGameParams: GameListItem) {
    // eslint-disable-next-line no-useless-catch
    try {
      axios.post(
        "/games",
        {
          ...createGameParams
        },
        { withCredentials: true }
      );
    } catch (error) {
      throw error;
    }
  }
}

export const gameStore = getModule(GameModule);
