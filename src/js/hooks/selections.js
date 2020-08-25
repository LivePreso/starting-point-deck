import _ from 'lodash';

export default {
  onSave({ sections, data, context }) {
    const slides = _.flatMap(sections, 'slides');

    return sections;
  }
};
