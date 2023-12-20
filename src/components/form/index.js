import { reactive } from "vue";

const dataObject = reactive({});

const initializeFormFieldVModel = (name) => {
  dataObject[name] = "";
  return dataObject[name];
};

export { initializeFormFieldVModel };
