<template>
  <div>
    <h2>ゲーム一覧</h2>
    <div class="game_create_button">
      <el-button type="primary" @click="displayGameCreatePage">
        新規登録
      </el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        prop="title"
        label="Title"
        width="180"
        show-overflow-tooltip
      />
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
      <el-table-column label="Operations">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">
            Edit
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { gameStore } from "@/store/game/game";
import { GameListItem } from "@/store/game/game.interface";

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

  @Watch("gameList")
  onChangeGameList() {
    console.log("変わったね");
  }

  private displayGameCreatePage() {
    this.$router.push("/createGame");
  }

  private handleEdit(row: GameListItem) {
    console.log(row);
  }

  private async handleDelete(row: GameListItem) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    gameStore.deleteGame(row.id!).then(() => {
      this.$router.go(0);
    });
  }
}
</script>

<style scoped>
.game_create_button {
  text-align: right;
  padding-right: 20px;
}
</style>
