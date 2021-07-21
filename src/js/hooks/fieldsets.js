import _ from 'lodash';
import Requests from './requests.js';

export default function(options) {
  const { Fieldset } = options;

  return new Fieldset({
    fields: [],

    onSave: function({ data, context }) {
      // PRESO DATE //
      let preso_date = '';
      if (_.isEmpty(context && context.preso_date)) {
        // Set preso date
        preso_date =
          moment(data.appointment.begin).format() || moment().format();
      } else if (
        moment(data.appointment.begin).format() !== context.preso_date
      ) {
        // If previous date is different to new date, update preso_date with new begin.
        preso_date = moment(data.appointment.begin).format();
      } else {
        // Else maintain same preso_start
        preso_date = context.preso_date;
      }

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

      return {
        context: {
          attendees,
          customer,
          preso_date
        }
      };
    }
  });
}
