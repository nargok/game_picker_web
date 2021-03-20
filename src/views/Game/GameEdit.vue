<template>
  <div>
    <!-- <GameForm pageTitle="ゲーム編集" gameId="`${gameId}`" /> -->
    <h1>ゲームの編集</h1>
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
          <CancelButton />
          <el-button @click="updateGame" type="primary">
            更新
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GameForm from "@/components/Game/GameForm.vue";
import CancelButton from "@/components/Game/CancelButton.vue";
import { gameStore } from "@/store/game/game";
import { GameListItem, GameUpdateParams } from "@/store/game/game.interface";

@Component({
  components: { GameForm, CancelButton }
})
export default class GameEdit extends Vue {
  private gameId = 0;
  private title: string | null = null;
  private url: string | null = null;
  private price = 0;
  private memo: string | null = null;

  async mounted() {
    this.gameId = Number(this.$route.params.id);
    const currentGame = await gameStore.getGameById(this.gameId);
    this.title = currentGame.title;
    this.url = currentGame.url;
    this.price = currentGame.price;
    this.memo = currentGame.memo;
  }

  private async updateGame() {
    if (this.title && this.url) {
      const updateGameParams: GameUpdateParams = {
        id: this.gameId,
        title: this.title,
        url: this.url,
        price: this.price,
        memo: this.memo ? this.memo : ""
      };
      await gameStore.updateGame(updateGameParams);
      this.$router.push("/games");
    }
  }
}
</script>
