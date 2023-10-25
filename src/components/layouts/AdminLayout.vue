<template>
  <div class="admin-layout">
    <header class="top-nav">

        <div class="d-flex justify-content-between align-items-center">

          <div class="logo-container">
            <router-link to="/dashboard">
              <img src="../../assets/images/logo.png" class="logo img-fluid" alt=""/>
            </router-link>
          </div>

          <div class="menu-container">
            <a @click="logout()" class="btn btn-primary"> Logout </a>
          </div>

        </div>
        
    </header>
    <main><slot /></main>
    
    <!-- <footer>Admin Footer</footer> -->
  </div>
</template>

<script>


import { useRouter } from "vue-router";
 

export default {
  
  name: "AdminLayout",
  
  setup() {

    const router = useRouter();

    const logout = () => {
      localStorage.removeItem("token");
      router.push("/");
    };

    return { 
      logout
    };

  },
  
  mounted() { 
  },


};
</script>
