<template>
  <div class="box-card">
    <h1>SignIn</h1>
    <el-row type="flex" justify="center" class="signin-form">
      <el-col :span="8">
        <div style="margin-top: 15px;">
          <el-input placeholder="email" v-model="email"></el-input>
        </div>
        <div style="margin-top: 15px;">
          <el-input placeholder="password" v-model="password"></el-input>
        </div>
        <div style="margin-top: 15px; margin-bottom: 15px">
          <el-button>サインイン</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

@Component({
  components: {
    // HelloWorld
  }
})
export default class SignIn extends Vue {
  private email: string | null = null;
  private password: string | null = null;
}
</script>

<style scoped>
.signin-form {
  /* max-width: 980px; */
  /* min-width: 100px; */
  /* border: 1px solid #ececec; */
}
</style>
