<template>
  <div>
    <v-container>
      <h2>Edit Employee</h2>
      <v-form @submit.prevent="updateEmployee">
        <v-text-field v-model="employee.name" label="Employee Name" required />
        <v-text-field
          v-model="employee.birthDate"
          label="Birth Date"
          type="date"
          required
        />
        <v-text-field
          v-model="employee.dateOfJoining"
          label="Date of Joining"
          type="date"
          required
        />
        <v-text-field
          v-model="employee.salary"
          label="Salary"
          type="number"
          required
        />
        <v-btn type="submit" color="primary">Save Changes</v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
// Swal Lib
import Swal from "sweetalert2";

export default {
  name: "EditEmployee",
  setup() {
    const employee = ref({
      name: "",
      birthDate: "",
      dateOfJoining: "",
      salary: "",
    });

    const route = useRoute();
    const router = useRouter();
    const employeeId = route.params.id;

    //  Get Employees
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `https://interview.frontend.equinesolutions.co/api/Employees/${employeeId}`
        );
        employee.value = response.data; // تحميل بيانات الموظف
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    // تحديث بيانات الموظف
    const updateEmployee = async () => {
      try {
        await axios.patch(
          `https://interview.frontend.equinesolutions.co/api/Employees/${employeeId}`,
          employee.value
        );
        // Message Edit
        Swal.fire({
          title: "Success!",
          text: "Employee data has been updated.",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          router.push({ name: "Employees" });
        });
      } catch (error) {
        console.error("Error updating employee:", error);
      }
    };

    onMounted(() => {
      fetchEmployee();
    });

    return {
      employee,
      updateEmployee,
    };
  },
};
</script>
