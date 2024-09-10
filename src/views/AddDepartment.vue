<template>
  <div>
    <Navigations />
    <v-container>
      <h2>Add New Department</h2>
      <v-form @submit.prevent="addDepartment">
        <v-text-field
          v-model="newDepartment.name"
          label="Department Name"
          required
        />
        <v-text-field
          v-model="newDepartment.manager"
          label="Manager"
          required
        />
        <v-text-field
          v-model="newDepartment.createdDate"
          label="Created Date"
          type="date"
          required
        />
        <v-text-field
          v-model="newDepartment.updatedDate"
          label="Updated Date"
          type="date"
          required
        />
        <v-btn type="submit" color="primary">Add Department</v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "AddDepartment",
  setup() {
    const newDepartment = ref({
      name: "",
      manager: "",
      createdDate: "",
      updatedDate: "",
    });

    const router = useRouter();

    const addDepartment = async () => {
      try {
        await axios.post(
          "https://interview.frontend.equinesolutions.co/api/Departments",
          newDepartment.value
        );
        router.push({ name: "Department" });
      } catch (error) {
        console.error("Error adding department:", error);
      }
    };

    return {
      newDepartment,
      addDepartment,
    };
  },
};
</script>

<style scoped>
/* إضافة أي تنسيق هنا إذا لزم الأمر */
</style>
