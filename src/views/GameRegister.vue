<template>
  <div>
    <h1>お気に入りゲームの登録</h1>
    <el-row type="flex" justify="center" class="signin-form">
      <el-col :span="8">
        <div style="margin-top: 15px;">
          <el-input placeholder="タイトル" v-model="title" />
        </div>
        <div style="margin-top: 15px;">
          <el-input placeholder="URL" v-model="url" />
        </div>
        <div style="margin-top: 15px;">
          <el-input placeholder="金額" v-model="price" />
        </div>
        <div style="margin-top: 15px;">
          <el-input type="textarea" placeholder="メモ" v-model="memo" />
        </div>
        <div style="margin-top: 15px; margin-bottom: 15px">
          <el-button @click="cancel">
            キャンセル
          </el-button>
          <el-button @click="createGame" type="primary">
            登録
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { gameStore } from "@/store/game/game";
import { GameListItem } from "@/store/game/game.interface";

@Component({
  components: {}
})
export default class GameRegister extends Vue {
  private title: string | null = null;
  private url: string | null = null;
  private price = 0;
  private memo: string | null = null;

  private async createGame() {
    if (this.title && this.url) {
      const createGameParams: GameListItem = {
        title: this.title,
        url: this.url,
        price: this.price,
        memo: this.memo ? this.memo : ""
      };
      await gameStore.createGame(createGameParams);
      this.$router.push("/games");
    }
  }

  private cancel() {
    this.$router.push("/games");
  }
}
</script>
