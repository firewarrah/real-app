import PageHeader from "./common/pageHeader";
import Form from "./common/form";
import Joi from "joi-browser";
import cardService from "../services/cardService";
import { toast } from "react-toastify";

class CreateCard extends Form {
  state = {
    data: {
      bizName: "",
      bizDescription: "",
      bizAddress: "",
      bizPhone: "",
      bizImage: "",
    },
    errors: {},
  };

  async doSubmit() {
    const { bizImage, ...data } = this.state.data;
    if (bizImage) {
      data.bizImage = bizImage;
    }
    await cardService.createCard(data);
    toast("A new card is opened");
    this.props.history.replace("my-cards");
  }

  schema = {
    bizName: Joi.string().min(2).max(255).required().label("Business Name"),
    bizDescription: Joi.string()
      .min(2)
      .max(1024)
      .required()
      .label("Business Description"),
    bizAddress: Joi.string()
      .min(2)
      .max(400)
      .required()
      .label("Business Address"),
    bizPhone: Joi.string()
      .min(9)
      .max(10)
      .required()
      .regex(/^0[2-9]\d{7,8}$/)
      .label("Business Phone"),
    bizImage: Joi.string()
      .min(11)
      .max(1024)
      .uri()
      .allow("")
      .label("Business Image"),
  };
  render() {
    return (
      <div className="container">
        <PageHeader titleText="Business registration form" />
        <div className="row">
          <div className="col-12">
            <p>Open a business cardi</p>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form noValidate onSubmit={this.handleSubmit}>
              {this.renderInput("bizName", "Business Name")}
              {this.renderInput("bizDescription", "Business Description")}
              {this.renderInput("bizAddress", "Business Address")}
              {this.renderInput("bizPhone", "Business Phone")}
              {this.renderInput("bizImage", "Business Image")}
              {this.renderButton("Create Card")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateCard;
