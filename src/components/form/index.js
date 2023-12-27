import { mapValues } from "lodash";
import { reactive } from "vue";
import supabase from "../../lib/supabase";

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
  for (let table in dataObject) {
    for (let key in dataObject[table]) {
      if (key === "data_array") {
        dataObject[table][key] = [];
      } else {
        dataObject[table][key] = "";
      }
    }
  }
}

function redefineListObject(key, fields) {
  if (!dataObject[key]) {
    dataObject[key] = {
      data_array: [],
    };

    for (const field of fields) {
      dataObject[key][field.key] = field.default ?? "";
    }
  }

  for (const field of fields) {
    dataObject[key][field.key] = field.default ?? "";
  }
}

async function defaultFormDataFind(dataObj, table, id) {
  const { data, error } = await supabase
    .from(table)
    .select()
    .eq("id", id)
    .limit(1)
    .single();

  dataObject[table] = data;
}

async function defaultListDataFind(dataObj, table, foreign, id) {
  const { data, error } = await supabase
    .from(table)
    .select()
    .eq(foreign, id)

  dataObject[table] = data;
}

export {
  listPush,
  resetForm,
  dataObject,
  redefineListObject,
  defaultFormDataFind,
};
