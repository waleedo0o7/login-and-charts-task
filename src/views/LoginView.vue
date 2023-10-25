<template>
  <div class="login-page">

    <div class="background-container">
      <div class="text-wrapper">
        <h2 class="mb-4 font-weight-bold">WELCOME TO DASHBOARD</h2>
        <div class="paragraph-wrapper w-50">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </p>
        </div>
      </div>
    </div> <!-- background-container -->

    <div class="form-container">
      <div class="form-wrapper">
        <h3 class="text-center mb-4">SIGN IN</h3>
        <form>
          <div class="form-group mb-2 input-with-icon">
            <input
              v-model="loginForm.email"
              type="email"
              class="form-control"
              placeholder="Email"
            />
            <div class="icon-wrapper">
              <i class="icon icon-email"></i>
            </div>
          </div>
          <div class="form-group mb-3 input-with-icon">
            <input
              v-model="loginForm.password"
              type="password"
              class="form-control"
              placeholder="Password"
            />
            <div class="icon-wrapper">
              <i class="icon icon-lock"></i>
            </div>
          </div>
          <a
            @click="login(loginForm.email, loginForm.password)"
            class="btn btn-primary text-uppercase w-100"
          >
            Login
          </a>
        </form>
      </div>
      <!-- form-wrapper -->
    </div> <!-- form-container -->
  </div>
</template>

<script>
import axios from "axios";

import { useRouter } from "vue-router";

import Vue3Toastify, { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "LoginView",
 
  setup() {

    const router = useRouter();
 
    const loginForm = {
      email: "",
      password: "",
    };

    const login = (email, password ) => {
      axios
        .post("https://dummyjson.com/auth/login", {
          username: email,
          password: password,
        })
        .then((res) => {  
          localStorage.setItem("token", res.data.token);
          router.push("/dashboard");
        })
        .catch((error) => {
          const notify = (message) => {
            toast(message, {
              autoClose: false,
              type: "error",
            });
          };
          notify(error?.response?.data?.message);
        });
    };

    return { 
      login,
      loginForm
    };
  },

  mounted() {
  },
};
</script>
