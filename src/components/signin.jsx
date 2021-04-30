import Form from "./common/form";
import Joi from "joi-browser";
import PageHeader from "./common/pageHeader";
import userService from "../services/userService";
import { Redirect } from "react-router-dom";

class Signin extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  async doSubmit() {
    const { email, password } = this.state.data;

    try {
      await userService.login(email, password);
      const { state: locationState } = this.props.location;
      window.location =
        locationState && locationState.from ? locationState.from.pathname : "/";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        this.setState({ errors: { email: err.response.data } });
      }
    }
  }
  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
  };

  render() {
    if (userService.getCurrentUser()) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <PageHeader titleText="Signin to Real App" />
        <div className="row">
          <div className="col-12">
            <p>You can sign in here with your account</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form noValidate onSubmit={this.handleSubmit}>
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderButton("Sign in")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
