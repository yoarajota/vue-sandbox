export default class FormConfig {
  fields = [];
  on = {};
  constructor(fields) {
    this.fields = fields;
  }

  getBind() {
    return {
      fields: this.fields
    }
  }

  getEvents() {
    return this.on
  }
}
