import { reactive } from "vue";
import supabase from "../../lib/supabase";

export default class FormConfig {
  fields = [];
  form_table = "";
  on = {};
  items = [];

  constructor(table, fields) {
    this.form_table = table;
    this.fields = fields;
  }

  getBind() {
    return {
      fields: this.fields,
      table: this.form_table,
    };
  }

  getEvents() {
    return this.on;
  }

  getIndexHeader() {
    return [
      {
        key: "action",
        title: "Action",
        sortable: false,
        align: "center",
      },
      ...this.fields.filter((field) => field.type !== "list"),
    ];
  }

  setItems(items) {
    this.items = items;
  }

  getItems() {
    return this.items;
  }

  query() {
    supabase
      .from(this.form_table)
      .select()
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
          return;
        }

        console.log(data);
        this.setItems(data);
      });
  }
}
