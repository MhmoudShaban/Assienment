import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import Department from "@/views/Department.vue";
import AddDepartment from "@/views/AddDepartment.vue";
import EditDepartment from "@/views/EditDepartment.vue";
import Employees from "@/views/Employees.vue";
import AddEmployee from "@/views/AddEmployee.vue";
import EditEmployee from "@/views/EditEmployee.vue";
import AllServices from "@/views/AllServices.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/AllServices",
    name: "AllServices",
    component: AllServices,
  },

  { path: "/departments", name: "Department", component: Department },
  { path: "/departments/add", name: "AddDepartment", component: AddDepartment },
  {
    path: "/departments/edit/:id",
    name: "EditDepartment",
    component: EditDepartment,
  },
  { path: "/employees", name: "Employees", component: Employees },
  { path: "/employees/add", name: "AddEmployee", component: AddEmployee },
  {
    path: "/employees/edit/:id",
    name: "EditEmployee",
    component: EditEmployee,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
