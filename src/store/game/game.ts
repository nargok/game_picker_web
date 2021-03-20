import store from "@/store";
import {
  Module,
  VuexModule,
  getModule,
  Mutation,
  Action
} from "vuex-module-decorators";
import axios from "axios";
import {
  GameListItem,
  GameCreateParams,
  GameUpdateParams
} from "@/store/game/game.interface";
import { profileStore } from "@/store/profile/profile";

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
  public async load() {
    const response = await axios.get("/games").catch(error => {
      throw error;
    });
    this.setGames(response.data);
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

  @Action
  public async getGameById(id: number) {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await axios.get(`/games/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  @Action async createGame(createGameParams: GameCreateParams) {
    const config = {
      headers: {
        Authorization: profileStore.accessToken
      },
      withCredentials: true
    };
    // eslint-disable-next-line no-useless-catch
    try {
      await axios.post(
        "/games",
        {
          ...createGameParams
        },
        config
      );
    } catch (error) {
      throw error;
    }
  }

  @Action async updateGame(updateGameParams: GameUpdateParams) {
    const config = {
      headers: {
        Authorization: profileStore.accessToken
      },
      withCredentials: true
    };
    // eslint-disable-next-line no-useless-catch
    try {
      await axios.put(
        `/games/${updateGameParams.id}`,
        {
          ...updateGameParams
        },
        config
      );
    } catch (error) {
      throw error;
    }
  }

  @Action async deleteGame(id: number) {
    const config = {
      headers: {
        Authorization: profileStore.accessToken
      },
      withCredentials: true
    };
    // eslint-disable-next-line no-useless-catch
    try {
      await axios.delete(`/games/${id}`, config);
    } catch (error) {
      throw error;
    }
  }
}

export const gameStore = getModule(GameModule);
