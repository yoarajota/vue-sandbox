import supabase from "../../lib/supabase";

export default class FormConfig {
  fields = [];
  form_table = "";
  on = {
    submit: async (submitData) => {
      const { data, error } = await supabase
        .from(this.form_table)
        .insert(submitData[this.form_table])
        .select("id")
        .limit(1)
        .single();

      for (const table of this.lists) {
        if (submitData[table]) {
          for (const list of submitData[table].data_array) {
            list.user_id = data.id;
            supabase.from(table).insert(list);
          }
        }
      }

      this.query();
    },
    delete: async (id) => {
      await supabase.from(this.form_table).delete().match({ id });
      this.query();
    },
  };
  items = [];
  lists = [];

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

  setLists(lists) {
    this.lists = lists;
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

  setItems(data) {
    this.items = data;
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

        this.setItems(data);
      });
  }
}
