import React from "react";
import { Form, Field } from "react-final-form";
import { connect } from "react-redux";
import { sendEmail, cleanContact } from "../actions";
import { languageData } from "./languageFile/languageFile";
import "./css/contactForm.css";

class ContactForm extends React.Component {
componentDidMount() {
  this.props.cleanContact();
}

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
    const placeHolder =
      languageData[this.props.selectedLanguage].contact.placeholder;

    const className = `${meta.error && meta.touched ? "form error" : "form"}`;
    return (
      <div className={className}>
        <label>{label}</label>
        {input.name === "Enquiry" ? (
          <textarea
            {...input}
            id=""
            placeholder={placeHolder}
          ></textarea>
        ) : (
          <input
            {...input}
            autoComplete="off"
          />
        )}

        {this.renderError(meta)}
      </div>
    );
  };
  onSubmit = (formValues) => {
    this.props.sendEmail(formValues);
  }

  render() {
    const response = this.props.contact && this.props.contact.message ? this.props.contact.message : null;
    const error = typeof this.props.contact === 'string' ? this.props.contact : null;
    const labels = languageData[this.props.selectedLanguage].contact.labels;
    const buttonText = languageData[this.props.selectedLanguage].contact.button;
    
    return (
      <div id="contactComponent">
        <div id="contactForm">
          <Form
            // initialValues={{
            //   Name: "Dave",
            //   Email: "starch@code.com",
            //   Phone: +666,
            //   Enquiry: "hi...",
            // }}
            validate={(formValues) => {
    
              const validEmailRegex = RegExp(
                // /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i
              );
              const validPhoneRegex = RegExp(/^[+]*[0-9]+$/);
              const errorMessages =
                languageData[this.props.selectedLanguage].contact.errors;

              const errors = {};

              if (!formValues.Name) {
                errors.Name = errorMessages[0];
              }

              if (!formValues.Email) {
                errors.Email = errorMessages[1];
              } else if (!validEmailRegex.test(formValues.Email) || formValues.Email.length > 70) {
                errors.Email = errorMessages[2];
              }

              if (!validPhoneRegex.test(formValues.Phone) && formValues.Phone) {
                errors.Phone = errorMessages[3];
              }
              if (!formValues.Enquiry) {
                errors.Enquiry = errorMessages[4];
              } else if(formValues.Enquiry.length > 2000){
                errors.Enquiry = errorMessages[5]
              }
              return errors;
              
            }}
            onSubmit={this.onSubmit}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="">
                <Field
                  name="Name"
                  component={this.renderInput}
                  label={labels[0]}
                />
                <Field
                  name="Email"
                  component={this.renderInput}
                  label={labels[1]}
                />
                <Field
                  name="Phone"
                  component={this.renderInput}
                  label={labels[2]}
                />
                <Field
                  name="Enquiry"
                  component={this.renderInput}
                  label={labels[3]}
                />
                <button className="">{buttonText}</button>
                <p className="success">{ response }</p>
                <p className="error">{ error }</p>
              </form>
            )}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ selectedLanguage, contact }) => {
  return {
    selectedLanguage: selectedLanguage.lan,
    contact: contact.response
  };
};
export default connect(mapStateToProps, { sendEmail, cleanContact })(ContactForm);
