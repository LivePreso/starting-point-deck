import _ from 'lodash';
import Requests from './requests.js';

export default function(options) {
  const { Fieldset } = options;

  return new Fieldset({
    fields: [],

    onSave: function({ data }) {
      const customerData = _.get(data, 'customers.0', {});

      const customer = {
        title: customerData.title,
        logo_original: customerData.logo_original
      };

      const attendees = _.map(data.contacts, function(contact) {
        return {
          full_name: contact.fullName,
          first_name: contact.name_first,
          last_name: contact.name_last,
          email: contact.email,
          phone: contact.phone
        };
      });

      const context = { attendees, customer };

      return { context };
    }
  });
}
