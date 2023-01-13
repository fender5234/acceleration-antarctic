export default (formElement, id = 0) => {
  const groupElements = formElement.querySelectorAll('[data-group]');
  let firstSubmit = true;

  groupElements.forEach((groupElement) => {
    const fieldElement = groupElement.querySelector('[name]');
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
      groupElement.classList.add('is-validable');

      if (fieldElement.checkValidity()) {
        localStorage.setItem(fieldId, fieldElement.value);
      }
    });

    groupElement.classList.remove('is-validable');
  });

  formElement.addEventListener('submit', (evt) => {
    if (firstSubmit) {
      groupElements.forEach((groupElement) => groupElement.classList.add('is-validable'));
      firstSubmit = false;
    }

    if (!formElement.checkValidity()) {
      evt.preventDefault();
    }
  });

  formElement.setAttribute('novalidate', '');
};
