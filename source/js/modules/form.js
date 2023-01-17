export default (formElement, id = 0) => {
  const fieldElements = formElement.querySelectorAll('[name]');

  fieldElements.forEach((fieldElement) => {
    const {name, type} = fieldElement;

    if (type === 'password') {
      return;
    }

    const fieldId = `form-${id}-${name}`;
    const value = localStorage.getItem(fieldId);
    if (value !== null) {
      fieldElement.value = value;
    }

    fieldElement.addEventListener('change', () => {
      if (fieldElement.checkValidity()) {
        localStorage.setItem(fieldId, fieldElement.value);
      }
    });
  });
};
