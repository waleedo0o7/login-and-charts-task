<template>
  <div class="dashboard-page">

    <div class="top-nav">

      <div class="container-fluid d-flex justify-content-between align-items-center">
        
        <div class="logo-container"> 

          <router-link to="/dashboard"> <img src="../assets/images/logo.png" class="logo img-fluid" alt=""> </router-link>

        </div><!-- logo-container -->

        <div class="menu-container">
          <a @click="logout()" class="btn btn-primary"> Logout </a>
        </div><!-- menu-container -->

      </div><!-- container-fluid -->
    </div><!-- top-nav -->


    <div class="container">
      <div class="row">
        <div class="col-md-4">

          <div class="card custom-card">
            <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
          </div>
        </div>
      </div>
    </div> <!-- container -->
  </div>
</template>

<script>
import axios from "axios";

import service from "@/shared/service";

import { useRouter } from "vue-router";

import { Bar } from "vue-chartjs";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "DashboardView",

  components: { Bar },

  setup() {
    const router = useRouter();

    const chartResponse = "";

    const chartData = {
      labels: ["ps1", "ps2", "ps3", "ps4", "ps5"],
      datasets: [
        {
          label: "Data One 000 ",
          backgroundColor: "#4981FD",
          borderRadius: 5, // Set the border radius for the bars
          color: "f0f",
          data: [50, 150, 210, 240, 170],
        },
      ],
    };
    const chartOptions = {
      plugins: {
        legend: {
          display: false,
        },
      },
      responsive: true,
      scales: {
        x: {
          grid: {
            display: false ,
          },
          ticks: {
            color: "#555", // Change the color of the x-axis tick labels
          },
        },
        y: {
          grid: {
            color: "#F3F5F7", // Change the color of the y-axis grid lines
          },
          ticks: {
            beginAtZero: true,
            stepSize: 100,
            color: "#555",
            callback: (value) => {
              return value + ' K';
              },
          },
        },
      },
    };

    const logout = () => {
      localStorage.removeItem("token");
      router.push("/");
    };

    const getChartsData = () => {
      axios
        .get("https://home.phi-pt.cat-sw.com/api/admin/main-charts")
        .then((e) => {
          console.log(e.data);
          this.chartResponse = e.data;
        })
        .catch((error) => {
          if (error?.response?.status === 401) {
            // not authorized user need to refresh token
            axios
              .get("https://home.phi-pt.cat-sw.com/api/auth/refresh")
              .then((e) => {
                if (e.token) {
                  localStorage.setItem("token", e.token);
                }
              });
          }
        });
    };

    return {
      chartData,
      chartOptions,

      service,
      chartResponse,
      logout,
      getChartsData,
    };
  },

  mounted() {
    this.getChartsData();
  },
};
</script>
