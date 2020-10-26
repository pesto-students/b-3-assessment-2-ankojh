import { useState } from 'react';

const VALIDATIONS_HANDLERS = {
  required: doesFailRequired,
  maxLength: doesFailMaxLength,
  minLength: doesFailMinLength
};


function isNumber(number){
  //+- infinity is fine
  return (typeof number === 'number' && Number.isFinite(number) && !Number.isNaN(number))
}

function doesFailRequired(value) {
  return !Boolean(value);
}

function doesFailMaxLength(value, maxLength) {
  if(!isNumber(maxLength)){
    throw new TypeError(`Expected Number instead got ${maxLength} of type ${typeof maxLength}`)
  }

  return value.toString().length > maxLength
}


function doesFailMinLength(value, minLength) {
  if (!isNumber(minLength)) {
    throw new TypeError(`Expected Number instead got ${minLength} of type ${typeof minLength}`)
  }
  return value.toString().length < minLength
}

function validateElement(element, validations) {
  const errors = {}
  Object.keys(validations).forEach(validationKey => {
    switch (validationKey) {
      case 'required':
        if (validations[validationKey] === true) {
          errors[validationKey] = VALIDATIONS_HANDLERS[validationKey](element.value)
        }
        break;
      case 'maxLength':
        errors[validationKey] = VALIDATIONS_HANDLERS[validationKey](element.value, validations[validationKey])
        break;
      case 'minLength':
        errors[validationKey] = VALIDATIONS_HANDLERS[validationKey](element.value, validations[validationKey])
        break;
      default:
        break;
    }
  })
  return errors;
}



function useForm() {

  const elements = {}

  const [errors, setErrors] = useState({});

  function registerElement(htmlElement, validations) {
    const key = htmlElement.name;

    elements[key] = {
      el: htmlElement,
      validations
    }
  }

  // function unregisterElement(){}

  function register(object) {

    if (typeof object !== 'object'){
      throw new TypeError(`Expected Object, instead got ${object} of type ${typeof object}`) 
    }

    if (object instanceof HTMLElement) {
      registerElement(object, {});
      return;
    }

    return (htmlElement) => {
      //? no need to validate htmlElement as it is React generated
      if (!htmlElement) {
        return
      }
      registerElement(htmlElement, object);
    }
  }

  function processAllElements() {
    const keyValuePairs = {}
    const errors = {}
    Object.keys(elements).forEach(elementKey => {
      const { el, validations } = elements[elementKey];
      //! what if something want some property other than value;
      keyValuePairs[elementKey] = el.value;
      errors[elementKey] = validateElement(el, validations);
    })

    return { keyValuePairs, errors };
  }

  function handleSubmit(onSubmit) {

    if (typeof onSubmit !== 'function') {
      throw new TypeError(`Expected function, instead got ${onSubmit} of type ${typeof onSubmit}`)
    }

    return (event) => {
      event.preventDefault();
      const { keyValuePairs, errors } = processAllElements()
      setErrors(errors);
      onSubmit(keyValuePairs);
    }
  }


  return {
    register,
    handleSubmit,
    errors
  }
}

export { useForm };
