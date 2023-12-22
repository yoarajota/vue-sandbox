import { mapValues } from "lodash";
import { reactive, watch } from "vue";

let dataObject = reactive({});

function listPush(key) {
  if (!dataObject[key]?.data_array) {
    dataObject[key].data_array = [];
  }

  const toPush = {};
  dataObject[key] = mapValues(dataObject[key], function (value, mapKey) {
    if (mapKey === "data_array") return value;

    toPush[mapKey] = value;
    return "";
  });

  dataObject[key].data_array.push(toPush);
}

function resetForm() {
  for (let key in dataObject) {
    dataObject[key] = "";
  }
}

export { listPush, resetForm, dataObject };
