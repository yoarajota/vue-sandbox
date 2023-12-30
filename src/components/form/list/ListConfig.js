import FormConfig from "../FormConfig";

export default class ListConfig extends FormConfig {
  constructor(table, fields) {
    super()
    this.form_table = table;
    this.fields = fields;
  }
}
