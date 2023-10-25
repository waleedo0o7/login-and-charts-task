<template>
  <AdminLayout>
    <div class="dashboard-page">
      <div class="container">
        <div class="page-header-wrapper mb-4">
          <h4 class="color-gray">Analytics Report</h4>
        </div>
        <!-- page-header -->

        <div class="row">
          <div class="col-md-4">
            <div class="card custom-card mb-4 mb-md-0">
              <p class="color-gray mb-3">Cases per PS</p>
              <Bar
                id="my-chart-id"
                :options="barChartOptions"
                :data="perPsChartData"
              />
            </div>
          </div>
          <!-- col-md-4 -->

          <div class="col-md-4">
            <div class="card custom-card mb-4 mb-md-0">
              <p class="color-gray mb-3"> Cases Per Prescriber </p>
              <Bar
                id="my-chart-id"
                :options="barChartOptions"
                :data="perPrescriberChartData"
              />
            </div>
          </div>
          <!-- col-md-4 -->

          <div class="col-md-4">
            <div class="card custom-card mb-4 mb-md-0">
              <p class="color-gray mb-3"> Cases Per Payer </p>
              <Bar
                id="my-chart-id"
                :options="barChartOptions"
                :data="perPayerChartData"
              />
            </div>
          </div>
          <!-- col-md-4 -->
        </div>
      </div>
      <!-- container -->
    </div>
  </AdminLayout>
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
import AdminLayout from "@/components/layouts/AdminLayout.vue";

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

  components: { Bar, AdminLayout },

  setup() {
    const router = useRouter();

    const chartResponse = "";

    const perPsChartData = {
      labels: ["ps1", "ps2", "ps3", "ps4", "ps5"],
      datasets: [
        {
          backgroundColor: "#4981FD",
          borderRadius: 5,
          color: "f0f",
          data: [50, 150, 210, 240, 170],
        },
      ],
    };

    const perPrescriberChartData = {
      labels: ["ps1", "ps2", "ps3", "ps4", "ps5"],
      datasets: [
        {
          backgroundColor: "#935CCB",
          borderRadius: 5,
          color: "f0f",
          data: [50, 150, 210, 240, 170],
        },
      ],
    };

    const perPayerChartData = {
      labels: ["ps1", "ps2", "ps3", "ps4", "ps5"],
      datasets: [
        {
          backgroundColor: "#26BBE3",
          borderRadius: 5,
          color: "f0f",
          data: [50, 150, 210, 240, 170],
        },
      ],
    };

    const barChartOptions = {
      plugins: {
        legend: {
          display: false,
        },
      },
      responsive: true,
      scales: {
        x: {
          grid: {
            display: false,
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
              return value + " K";
            },
          },
        },
      },
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
      perPsChartData,
      perPrescriberChartData,
      perPayerChartData,
      barChartOptions,

      service,
      chartResponse, 
      getChartsData,
    };
  },

  mounted() {
    this.getChartsData();
  },
};
</script>
