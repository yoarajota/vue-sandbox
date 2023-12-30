import supabase from "../../lib/supabase";
import { useRouter } from "vue-router";

export default class FormConfig {
  fields = [];
  form_table = "";
  on = {};
  items = [];
  actions = [];
  list_info = {};

  constructor(table, fields) {
    this.form_table = table;
    this.fields = fields;

    const router = useRouter();

    this.actions = [
      {
        title: "View/Edit",
        icon: "mdi-pencil",
        action: (id) => {
          router.push(`/users/${id}`);
        },
      },
      {
        title: "Delete",
        icon: "mdi-delete",
        action: (id) => {
          this.on.delete(id);
        },
      },
    ];
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

  setActions(actions) {
    this.actions = actions;
  }

  getActions() {
    return this.actions;
  }

  setListInfo(object) {
    this.list_info = object;
  }

  getListInfo() {
    return this.list_info;
  }

  query() {
    supabase
      .from(this.form_table)
      .select()
      .then(({ data, error }) => {
        if (error) {
          return;
        }

        this.setItems(data);
      });
  }
}
