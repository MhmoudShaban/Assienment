<template>
  <v-container fluid class="pa-0">
    <div class="page-layout">
      <!-- Title Sec-->
      <div class="left-section">
        <h1>Employee</h1>
        <h1>Management System</h1>
        <div class="btn">
          <router-link
            :to="{ name: 'AllServices' }"
            style="border-radius: 25px"
          >
            <v-btn class="custom-btn" elevation="1" size="large">
              EXplore
            </v-btn>
          </router-link>
        </div>
      </div>

      <!-- img Sec-->
      <div class="right-section">
        <img src="../assets/pexels-linkedin-2182973.jpg" alt="Employees" />
      </div>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      isDialogOpen: false,
    };
  },
};
</script>

<style scoped lang="scss">
html,
body,
.v-container {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  // layout
  .page-layout {
    display: flex;
    height: 100vh;
    background: #353b48;
    .left-section {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      h1 {
        font-size: 60px;
        font-family: "Bebas Neue", sans-serif;
        font-weight: normal;
        color: #fff;

        &:first-child {
          color: #fbc531;
        }
        &:nth-child(2) {
          margin-bottom: 10px;
        }
      }
    }
    .right-section {
      flex: 1;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        // background-size: cover;
      }
    }
    .btn {
      display: flex;
      overflow: hidden;
      border-radius: 25px;
      gap: 1rem;
      .custom-btn {
        border-radius: 25px;
        padding: 10px 20px;
        background: #ffffff;
        color: #333;
        border: 2px solid #ffffff;
        transition: all 0.3s ease;
        &:hover {
          background: #fbc531;
          color: #fff;
          border: 2px solid #fbc531;
        }
        &:focus {
          outline: none;
        }
      }
    }
  }
}
</style>
