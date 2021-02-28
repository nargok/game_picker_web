<template>
  <div class="box-card">
    <h1>SignIn</h1>
    <el-row type="flex" justify="center" class="signin-form">
      <el-col :span="8">
        <div style="margin-top: 15px;">
          <el-input placeholder="email" v-model="email" />
        </div>
        <div style="margin-top: 15px;">
          <el-input placeholder="password" v-model="password" show-password />
        </div>
        <div style="margin-top: 15px; margin-bottom: 15px">
          <el-button @click="signIn">
            サインイン
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { profileStore } from "@/store/profile/profile";
import { LoginParams } from "@/store/profile/profile.interface";

@Component({
  components: {}
})
export default class SignIn extends Vue {
  private email: string | null = null;
  private password: string | null = null;

  private async signIn() {
    if (this.email && this.password) {
      try {
        const loginParams: LoginParams = {
          email: this.email,
          password: this.password
        };
        await profileStore.signInAsync(loginParams);
        this.$router.push("/");
      } catch (error) {
        console.log("error:", error);
      }
    }
  }
}
</script>

<style scoped></style>
