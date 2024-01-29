import { required } from '../components/form/rules';

export default [
  {
    key: "name",
    title: "Name",
    type: "text",
    placeholder: "Enter your name",
    required: true,
    rules: [required],
    sizing: {
      cols: 12,
      sm: 6,
    },
    filter_sizing: {
      cols: 12,
      sm: 12,
    },
  },
];
