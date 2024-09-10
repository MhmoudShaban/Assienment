<template>
  <div>
    <Navigations />
    <v-container>
      <h2>Edit Department</h2>
      <v-form @submit.prevent="updateDepartment">
        <v-text-field
          v-model="department.name"
          label="Department Name"
          required
        />
        <v-text-field v-model="department.manager" label="Manager" required />
        <v-text-field
          v-model="department.createdDate"
          label="Created Date"
          type="date"
          required
        />
        <v-text-field
          v-model="department.updatedDate"
          label="Updated Date"
          type="date"
          required
        />
        <v-btn type="submit" color="primary">Save Changes</v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

export default {
  name: "EditDepartment",
  setup() {
    const department = ref({
      name: "",
      manager: "",
      createdDate: "",
      updatedDate: "",
    });

    const route = useRoute();
    const router = useRouter();
    const departmentId = route.params.id; // جلب الـ id من الـ route

    const fetchDepartment = async () => {
      try {
        const response = await axios.get(
          `https://interview.frontend.equinesolutions.co/api/Departments/${departmentId}`
        );
        department.value = response.data;
      } catch (error) {
        console.error("Error fetching department data:", error);
      }
    };

    const updateDepartment = async () => {
      try {
        await axios.patch(
          `https://interview.frontend.equinesolutions.co/api/Departments/${departmentId}`,
          department.value
        );
        router.push({ name: "Department" }); // إعادة التوجيه بعد التعديل
      } catch (error) {
        console.error("Error updating department:", error);
      }
    };

    onMounted(() => {
      fetchDepartment();
    });

    return {
      department,
      updateDepartment,
    };
  },
};
</script>

<style scoped></style>
