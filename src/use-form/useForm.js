import React, { useState } from 'react';

const VALIDATIONS_HANDLERS = {
  required: doesFailRequired,
  maxLength: doesFailMaxLength,
  minLength: doesFailMinLength
};


function doesFailRequired(value) {
  return !Boolean(value);
}

function doesFailMaxLength(value, maxLength) {
  //validate value and maxlengths
  return value.toString().length > maxLength
}


function doesFailMinLength(value, minLength) {
  //validate value and minLength
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
      default:
        break;
    }
  })
  return errors;
}



function useForm() {

  const elements = {}

  const [errors, setErrors] = useState({});

  //todo validate params
  function registerElement(htmlElement, validations) {
    const key = htmlElement.name;

    elements[key] = {
        el: htmlElement,
        validations
      }
  }

  // function unregisterElement(){}

  //todo validate params
  function register(object) {
    if(!object){
      return;
    }
    if (object instanceof HTMLElement) {
      registerElement(object, {});
      return;
    }

    return (htmlElement) => {
      if(!htmlElement){
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

    return {keyValuePairs, errors};
  }

  function handleSubmit(onSubmit) {
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
