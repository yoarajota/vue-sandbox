import { ref } from "vue";

const dataObject = ref({});

const initializeListFieldVModel = (name) => {
  dataObject[name] = "";
  return dataObject[name];
};

export { initializeListFieldVModel };
