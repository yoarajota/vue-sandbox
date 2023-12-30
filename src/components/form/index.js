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
    if (mapKey === "data_array" || mapKey === "array_index") return value;

    toPush[mapKey] = value;
    return "";
  });

  if (dataObject[key]?.array_index !== undefined) {
    delete toPush.array_index;

    dataObject[key].data_array[dataObject[key].array_index] = toPush;

    delete dataObject[key].array_index;
    return;
  }

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

async function defaultSubmit(submitData, config) {
  const { data, error } = await supabase
    .from(config.form_table)
    .upsert(submitData[config.form_table])
    .select("id")
    .limit(1)
    .single();

  const promises = [];
  for (const table of config.getListInfo().tables) {
    if (submitData[table]) {
      const ids = [];
      for (const list of submitData[table].data_array) {
        if (list.id) {
          ids.push(list.id);
        }
        list.user_id = data.id;
        promises.push(supabase.from(table).upsert(list));
      }

      if (ids.length > 0) {
        promises.push(
          supabase
            .from(table)
            .delete()
            .eq("user_id", data.id)
            .not("id", "in", "(" + ids.join(",") + ")")
        );
      }
    }
  }

  await Promise.all(promises);
}

async function defaultFormDataFind(table, id) {
  const { data, error } = await supabase
    .from(table)
    .select()
    .eq("id", id)
    .limit(1)
    .single();

  dataObject[table] = data;
}

async function defaultFormDataListFind(dataObj, { tables, foreign_key }, id) {
  const promises = [];

  for (const table of tables) {
    promises.push(
      supabase
        .from(table)
        .select()
        .eq(foreign_key, id)
        .then(({ data, error }) => {
          dataObject[table] = {};
          dataObject[table].data_array = data;
        })
    );
  }

  await Promise.all(promises);
}

export {
  dataObject,
  listPush,
  resetForm,
  redefineListObject,
  defaultFormDataFind,
  defaultFormDataListFind,
  defaultSubmit,
};
