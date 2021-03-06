import PageHeader from "./common/pageHeader";
import Form from "./common/form";
import Joi from "joi-browser";
import http from "../services/http";
import { apiUrl } from "../config.json";
import userService from "../services/userService";
import { Redirect } from "react-router-dom";

class BizSignup extends Form {
  state = {
    data: {
      email: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  async doSubmit() {
    const data = { ...this.state.data, biz: true };
    try {
      const { email, password } = data;

      await http.post(`${apiUrl}/users`, data);
      await userService.login(email, password);
      window.location = "/create-card";
    } catch (err) {
      if (err.response && err.response.status === 400) {
        this.setState({ errors: err.response.data.errors });
      }
    }
  }

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
    name: Joi.string().required().min(2).label("Name"),
  };

  render() {
    if (userService.getCurrentUser()) {
      return <Redirect to="/" />;
    }

    return (
      <div className="container">
        <PageHeader titleText="Business Signup for Real App" />
        <div className="row">
          <div className="col-12">
            <p>You can open a new account for free, don't be Yammani</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form noValidate onSubmit={this.handleSubmit}>
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderInput("name", "Name")}
              {this.renderButton("Next")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default BizSignup;
