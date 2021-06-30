function getCompanywide(key, defaultText) {
  const slideValues = Bridge.Companywide.getWithKeys([key]);
  if (!Deck.modes.is('edit-mode')) {
    const editableValue = Bridge.Editable.getWithKey(key);
    if (
      editableValue &&
      editableValue.value &&
      editableValue.value !== defaultText
    ) {
      return editableValue.value;
    }
  }
  if (slideValues && slideValues.length) {
    const slideValue = _.find(slideValues, value => value.key === key);
    if (slideValue && slideValue.value) {
      return slideValue.value;
    }
  }
  return defaultText;
}
