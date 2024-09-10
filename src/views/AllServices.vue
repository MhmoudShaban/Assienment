<template>
  <div>
    <Navigations />
    <Emplyees />
  </div>
</template>
<script>
import Emplyees from "@/views/Employees.vue";
import Navigations from "@/components/Navigations.vue";

export default {
  name: "Employee",
  components: {
    Navigations,
    Emplyees,
  },
  data() {
    return {};
  },
};
</script>
