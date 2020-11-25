import React from "react";
import { reduxForm, Field } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../../actions"; // returns actions {}

class Signin extends React.Component {
  // Form submit callback. formProps object: { email, password }.
  onSubmit = (formProps) => {
    this.props.signin(formProps, () => {
      this.props.history.push("/feature"); // After signin auto redirect user using history prop provided by react router.
    });
  };

  render() {
    const { handleSubmit } = this.props; // handleSubmit() provided by redux-form

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label>Email</label>
          <Field
            name="email"
            type="text"
            component="input"
            autoComplete="off"
          />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <Field
            name="password"
            type="password"
            component="input"
            autoComplete="off"
          />
        </fieldset>
        <div>{this.props.errorMessage}</div>
        <button>Sign In</button>
      </form>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    errorMessage: state.auth.errorMessage,
  };
};

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: "signin" })
)(Signin);

// Use redux's compose() allow us to apply multiple HOC to a single component
// export default reduxForm({ form: "signin" })(Signin);
