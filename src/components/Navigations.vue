<template>
  <v-card>
    <v-layout>
      <v-app-bar color="grey-darken-4">
        <v-app-bar-nav-icon
          variant="text"
          outlined
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>Employee Management</v-toolbar-title>
      </v-app-bar>
      <v-navigation-drawer
        color="grey-darken-4"
        v-model="drawer"
        :location="$vuetify.display.mobile ? 'left' : undefined"
      >
        <v-list dense>
          <v-list-item-group>
            <!-- Employees Section -->
            <v-list-item @click="$router.push('/employees')">
              <v-icon>mdi-account</v-icon>
              <v-list-item-title>List Employees</v-list-item-title>
            </v-list-item>

            <v-list-item @click="$router.push('/employees/add')">
              <v-icon>mdi-account-plus</v-icon>
              <v-list-item-title>Add Employee</v-list-item-title>
            </v-list-item>

            <v-list-item @click="$router.push('/departments')">
              <v-icon>mdi-office-building</v-icon>
              <v-list-item-title>List Departments</v-list-item-title>
            </v-list-item>

            <v-list-item @click="$router.push('/departments/add')">
              <v-icon>mdi-office-building-plus</v-icon>
              <v-list-item-title>Add Department</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>

      <v-main style="border-radius: 30%"> </v-main>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    items: [],
  }),

  watch: {
    group() {
      this.drawer = false;
    },
  },
};
</script>

<style lang="scss">
.v-list-item__content {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 50px;
}
</style>
