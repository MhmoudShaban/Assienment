<template>
  <div>
    <Navigations />
    <v-container>
      <v-form @submit.prevent="addEmployee">
        <v-text-field
          v-model="newEmployee.name"
          label="Employee Name"
          required
        />
        <v-text-field
          v-model="newEmployee.birthDate"
          label="Birth Date"
          type="date"
          required
        />
        <v-text-field
          v-model="newEmployee.dateOfJoining"
          label="Date of Joining"
          type="date"
          required
        />
        <v-text-field
          v-model="newEmployee.salary"
          label="Salary"
          type="number"
          required
        />
        <v-text-field
          v-model="newEmployee.createdDate"
          label="Created Date"
          type="date"
          required
        />
        <v-text-field
          v-model="newEmployee.updatedDate"
          label="Updated Date"
          type="date"
          required
        />
        <v-btn type="submit" color="primary">Add Employee</v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import Navigations from "@/components/Navigations.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";

export default {
  name: "Employee",
  components: {
    Navigations,
  },
  setup() {
    const router = useRouter();
    const employees = ref([]);
    const newEmployee = ref({
      name: "",
      birthDate: "",
      dateOfJoining: "",
      salary: "",
      id: "",
      createdDate: "",
      updatedDate: "",
    });

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

    const addEmployee = async () => {
      try {
        const response = await axios.post(
          "https://interview.frontend.equinesolutions.co/api/Employees",
          {
            name: newEmployee.value.name,
            birthDate: newEmployee.value.birthDate,
            dateOfJoining: newEmployee.value.dateOfJoining,
            salary: newEmployee.value.salary,
            id: newEmployee.value.id,
            createdDate: newEmployee.value.createdDate,
            updatedDate: newEmployee.value.updatedDate,
          }
        );
        employees.value.push(response.data);
        newEmployee.value = {
          name: "",
          birthDate: "",
          dateOfJoining: "",
          salary: "",
          id: "",
          createdDate: "",
          updatedDate: "",
        };

        // Submit Added
        Swal.fire({
          title: "Success",
          text: "Employee added successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });

        router.push({ name: "Employees" });
      } catch (error) {
        console.error("There was an error adding the employee:", error);

        Swal.fire({
          title: "Error",
          text: "There was an error adding the employee.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    onMounted(() => {
      fetchEmployees();
    });

    return {
      employees,
      newEmployee,
      addEmployee,
      router,
    };
  },
};
</script>
