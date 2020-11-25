import React, { Component } from "react";
import { connect } from "react-redux";

const requireAuth = (ChildComponent) => {
  class ComposedComponent extends Component {
    // Our component just got rendered
    componentDidMount() {
      // console.log("*REQUIREAUTH-COMPONENTDIDMOUNT*");
      this.shouldNavigateAway();
    }

    // Our component just got updated
    componentDidUpdate() {
      // console.log("*REQUIREAUTH-COMPONENTDIDUPDATE*");
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      if (!this.props.auth) {
        this.props.history.push("/");
      }
    }

    render() {
      // console.log("*REQUIREAUTH-RENDER*");
      // console.log({ ...this.props }); // { history:.., location:.., match:.., auth:..,  }
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    return { auth: state.auth.authenticated };
  }

  return connect(mapStateToProps)(ComposedComponent);
};

export default requireAuth;

/*
  HOC to control if component (ex: Feature component) provided as argument should be rendered based on auth state.
*/
