<template>
  <div>
    <h2>ゲーム一覧</h2>
    <div class="game_create_button">
      <el-button type="primary" @click="displayGameCreatePage">
        新規登録
      </el-button>
    </div>
    <el-table :data="tableData" height="250" style="width: 100%">
      <el-table-column prop="title" label="Title" width="180" />
      <el-table-column label="URL">
        <template slot-scope="scope">
          <a
            v-bind:href="scope.row.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ scope.row.url }}
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="Price" width="180" />
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { gameStore } from "@/store/game/game";

@Component({
  components: {}
})
export default class GameList extends Vue {
  private get tableData() {
    return gameStore.getGames;
  }

  mounted() {
    gameStore.getGameList();
  }

  private displayGameCreatePage() {
    this.$router.push("/createGame");
  }
}
</script>

<style scoped>
.game_create_button {
  text-align: right;
  padding-right: 20px;
}
</style>
