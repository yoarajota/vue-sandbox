import supabase from "../../lib/supabase";
import { useRouter } from "vue-router";

export default class FormConfig {
  fields = [];
  form_table = "";
  on = {};
  items = [];
  actions = [];
  list_info = {};
  query_filter = {};
  page = 1;
  querying = false;

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

  pushItems(items) {
    this.items.push(...items);
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

  query(type = "push") {
    this.querying = true;

    const q = supabase.from(this.form_table).select();

    for (const key in this.query_filter) {
      q.ilike(key, this.query_filter[key] + "%");
    }

    if (this.itemsPerPage !== undefined && this.page !== undefined) {
      const from = (this.page - 1) * this.itemsPerPage;
      const to = from + this.itemsPerPage;

      q.range(from, to);
    }

    if (this.sortBy?.[0]) {
      for (const toSort of this.sortBy) {
        q.order(toSort.key, { ascending: toSort.order === "asc" });
      }
    }

    q.then(({ data, error }) => {
      if (error) {
        return;
      }

      this[type + "Items"](data);
      this.querying = false;
    });
  }
}
