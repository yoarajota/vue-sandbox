import { reactive } from "vue";

const dataObject = reactive({});

const initializeVModel = (name) => {
  dataObject[name] = "";
  return dataObject[name];
};

export { initializeVModel };
