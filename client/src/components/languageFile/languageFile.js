import React from 'react';

export const languageData = {
  en: {
    menu: ['Home', 'Biography', 'Music', 'Shows', 'Contact'],
    contact: {
      text: ['Get in touch', 'Feel free to contact me for all your enquires including lessons and collabroationsor just say hi.', 'You can also reach me via this email:'],
      labels: ['Name', 'Email', 'Phone (optional)', 'Enquiry'],
      placeholder: 'Please write your message...',
      button: 'Submit',
      errors: ['Please enter your name', 'Please enter your Email', 'Email address must be valid!','Phone number must be valid!', 'Please enter your enquiry', 'Your enquiry is too long!']
    },
    dates:{
      days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ]
    },
    music: ['Released on '],
    shows: ['Info / Tickets']
  },
  es: {
    menu: ['Hogar', 'Biografía', 'Música', 'Espectáculos', 'Contacto'],
    contact: {
      text: ['Ponerse en contacto', 'No dude en ponerse en contacto conmigo para todas sus consultas, incluidas lecciones y colaboraciones, o simplemente decir hola.', 'También puede comunicarse conmigo a través de este correo electrónico:'],
      labels: ['Nombre', 'Correo electrónico', 'Teléfono (opcional)', 'Consulta'],
      placeholder: 'Por favor escriba su mensaje ...',
      button: 'Enviar',
      errors: ['por favor, escriba su nombre', 'Por favor introduzca su correo electrónico', 'La dirección de correo electrónico debe ser válida.','¡El número de teléfono debe ser válido!', 'Por favor ingrese su consulta', '¡Tu consulta es demasiado larga!']
    },
    dates:{
      days: [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
      ],
      months: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ]
    },
    music: ['Lanzado el ', 'de '],
    shows: ['Información / Entradas']
  },
};
