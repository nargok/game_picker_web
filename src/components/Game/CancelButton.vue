<template>
  <el-button @click="cancel">
    キャンセル
  </el-button>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class CancelButton extends Vue {
  private cancel() {
    this.$router.push("/games");
  }
}
</script>
