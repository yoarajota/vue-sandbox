import { reactive  } from "vue";

const dataObject = reactive({});

const input = (name, trace = null, value) => {
  if (trace) {
    let currentObject = dataObject;
    for (let key of trace) {
      if (!currentObject[key]) {
        currentObject[key] = {};
      }

      currentObject = currentObject[key];
    }
    currentObject[name] = value;
    return;
  }
  
  dataObject[name] = value;
};

const modelValue = (name, trace = null) => {
  if (trace) {
    let currentObject = dataObject;
    for (let key of trace) {
      if (!currentObject[key]) {
        currentObject[key] = {};
      }

      currentObject = currentObject[key];
    }
    return currentObject[name];
  }
  
  return dataObject[name];
};

function listPush(key) {
  if (!dataObject[key].data_array) {
    dataObject[key].data_array = [];
  }

  dataObject[key].data_array.push(dataObject[key]);
}

export { input, modelValue, dataObject };
