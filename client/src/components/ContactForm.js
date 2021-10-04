import React from "react";
import { Form, Field } from "react-final-form";

import "./css/contactForm.css";

class ContactForm extends React.Component {
  renderError = ({ error, touched }) => {
    if (touched && error) {
      return (
        <div className="error">
          <div className="">{error}</div>
        </div>
      );
    }
  };

  renderInput = ({ input, label, meta }) => {
    const patterns = {
      Email: "[a-zA-Z0-9._%+-]+@[[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$",
      Phone: "([+])?[0-9]+",
    };
    const className = `${meta.error && meta.touched ? "form error" : "form"}`;
    return (
      <div className={className}>
        <label>{label}</label>
        {input.name == "Enquiry" ? (
          <textarea
            {...input}
            id=""
            placeholder="Please write your message..."
            maxLength="350"
          ></textarea>
        ) : (
          <input
            {...input}
            autoComplete="off"
            pattern={patterns[input.name] ? patterns[input.name] : null}
            maxLength="200"
          />
        )}

        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit(formValues) {
    console.log("submit", formValues);
  }

  render() {
    return (
      <div id="contactComponent">
        <div id="contactForm">
          <Form
            initialValues={{
              Name: "Dave",
              Email: "a@a.com",
              Phone: 0,
              Enquiry: "hi...",
            }}
            validate={(formValues) => {
              const errors = {};

              if (!formValues.Name) {
                errors.Name = "Please enter your name";
              }

              if (!formValues.Email) {
                errors.Email = "Please enter your Email";
              }
              if (!formValues.Enquiry) {
                errors.Enquiry = "Please enter your enquiry";
              }
              return errors;
            }}
            onSubmit={this.onSubmit}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="">
                <Field name="Name" component={this.renderInput} label="Name" />
                <Field
                  name="Email"
                  component={this.renderInput}
                  label="Email"
                />
                <Field
                  name="Phone"
                  component={this.renderInput}
                  label="Phone"
                />
                <Field
                  name="Enquiry"
                  component={this.renderInput}
                  label="Enquiry"
                />
                <button className="">Submit</button>
              </form>
            )}
          />
        </div>
      </div>
    );
  }
}

export default ContactForm;
