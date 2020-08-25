import Requests from './requests.js';

export default function(options) {
  const { Fieldset } = options;

  return new Fieldset({
    fields: [],

    onSave: function({ data }) {
      return { data };
    }
  });
}
