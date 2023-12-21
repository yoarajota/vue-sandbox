import { result, mapValues, set } from "lodash";
import { reactive  } from "vue";

const dataObject = reactive({});

const input = (name, trace = null, value) => {
  if (trace) {
    set(dataObject, [...trace, name], value);
    return;
  }
  
  dataObject[name] = value;
};

const getValue = (name, trace = null) => {
  if (trace) {
    return result(dataObject, [...trace, name]);
  }

  return dataObject[name];
};

function listPush(key) {
  if (!dataObject[key]?.data_array) {
    dataObject[key].data_array = [];
  }

  const toPush = {};
  // PUSH EVERY ATTRIBUTE, MINUS 'data_array'
  dataObject[key] = mapValues(dataObject[key], function(value, mapKey) {
    if (mapKey === 'data_array') return value;

    toPush[mapKey] = value;
    return "";
  })  

  dataObject[key].data_array.push(toPush);
}

export { input, getValue, listPush, dataObject };
