<template>
  <div>
    <Navigations />
    <v-container>
      <h2 class="my-5">Departments List</h2>

      <table class="table">
        <thead class="table-dark text-white">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Manager</th>
            <th>Created Date</th>
            <th>Updated Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="department in departments" :key="department.id">
            <td>#{{ department.id }}</td>
            <td>{{ department.name }}</td>
            <td>{{ department.manager }}</td>
            <td>{{ formatDate(department.createdDate) }}</td>
            <td>{{ formatDate(department.updatedDate) }}</td>
            <td>
              <!-- أيقونة التعديل -->
              <router-link
                :to="{ name: 'EditDepartment', params: { id: department.id } }"
              >
                <v-icon color="primary">mdi-pencil</v-icon>
              </router-link>
            </td>
            <td>
              <!-- أيقونة الحذف -->
              <v-icon @click="confirmDelete(department.id)" color="red">
                mdi-delete
              </v-icon>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- رسالة عند عدم وجود بيانات -->
      <div v-if="!departments.length" class="alert alert-warning">
        No departments found.
      </div>
    </v-container>
  </div>
</template>

<script>
import Navigations from "@/components/Navigations.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { format } from "date-fns";
import Swal from "sweetalert2"; // استيراد مكتبة sweetalert2

export default {
  name: "Department",
  components: {
    Navigations,
  },
  setup() {
    const departments = ref([]);

    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          "https://interview.frontend.equinesolutions.co/api/Departments"
        );
        departments.value = response.data;
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    const formatDate = (dateString) => {
      if (!dateString) return "";
      const date = new Date(dateString);
      return format(date, "yyyy-MM-dd");
    };

    // دالة لتأكيد الحذف باستخدام swal
    const confirmDelete = async (departmentId) => {
      // تحقق من وجود موظفين في القسم
      try {
        const response = await axios.get(
          `https://interview.frontend.equinesolutions.co/api/Departments/${departmentId}/employees`
        );
        const employees = response.data;

        if (employees.length > 0) {
          Swal.fire({
            title: "Cannot delete department",
            text: "The department contains employees. Please remove employees before deleting the department.",
            icon: "warning",
          });
          return;
        }

        // إذا لم يكن هناك موظفون، تابع حذف القسم
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await deleteDepartment(departmentId);
            Swal.fire("Deleted!", "Department has been deleted.", "success");
          }
        });
      } catch (error) {
        console.error("Error checking employees:", error);
        Swal.fire(
          "Error",
          "An error occurred while checking employees.",
          "error"
        );
      }
    };

    // دالة لحذف القسم
    const deleteDepartment = async (departmentId) => {
      try {
        await axios.delete(
          `https://interview.frontend.equinesolutions.co/api/Departments/${departmentId}`
        );
        departments.value = departments.value.filter(
          (department) => department.id !== departmentId
        );
      } catch (error) {
        console.error(
          "Error deleting department:",
          error.response ? error.response.data : error.message
        );
      }
    };

    onMounted(() => {
      fetchDepartments();
    });

    return {
      departments,
      formatDate,
      confirmDelete,
    };
  },
};
</script>

<style scoped>
.table-dark {
  background-color: #343a40 !important;
}

.text-white {
  color: #ffffff !important;
}
</style>
