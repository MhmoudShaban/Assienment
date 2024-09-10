<template>
  <div>
    <Navigations />
    <v-container>
      <h2 class="my-5">Employees Lists</h2>

      <table class="table">
        <thead class="table-dark text-white">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Salary</th>
            <th>Birth Date</th>
            <th>Created Date</th>
            <th>Updated Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in employees" :key="employee.id">
            <td>#{{ employee.id }}</td>
            <td>{{ employee.name.toUpperCase() }}</td>
            <td>{{ employee.salary }}</td>
            <td>{{ formatDate(employee.birthDate) }}</td>
            <td>{{ formatDate(employee.createdDate) }}</td>
            <td>{{ formatDate(employee.updatedDate) }}</td>
            <td>
              <router-link
                :to="{ name: 'EditEmployee', params: { id: employee.id } }"
                ><v-icon color="primary"> mdi-pencil </v-icon></router-link
              >
            </td>
            <td>
              <v-icon @click="confirmDelete(employee.id)" color="red">
                mdi-delete
              </v-icon>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="!employees.length" class="alert alert-warning">
        No employees found.
      </div>
    </v-container>
  </div>
</template>

<script>
import Navigations from "@/components/Navigations.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { format } from "date-fns";
// Library for Errors and success MS
import Swal from "sweetalert2";

export default {
  name: "Employee",
  components: {
    Navigations,
  },
  setup() {
    const employees = ref([]);

    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "https://interview.frontend.equinesolutions.co/api/Employees"
        );
        employees.value = response.data;
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };
    // DataFormate
    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return format(date, "yyyy-MM-dd");
    };
    // Swal Lib
    const confirmDelete = (employeeId) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await deleteEmployee(employeeId);
          Swal.fire("Deleted!", "Employee has been deleted.", "success");
        }
      });
    };

    // Delete Employee
    const deleteEmployee = async (employeeId) => {
      try {
        await axios.delete(
          `https://interview.frontend.equinesolutions.co/api/Employees/${employeeId}`
        );
        employees.value = employees.value.filter(
          (employee) => employee.id !== employeeId
        );
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    };

    onMounted(() => {
      fetchEmployees();
    });

    return {
      employees,
      formatDate,
      confirmDelete,
    };
  },
};
</script>

<style scoped>
button.swal2-confirm.swal2-styled {
  color: red !important;
}

.text-white {
  color: #ffffff !important;
}
</style>
