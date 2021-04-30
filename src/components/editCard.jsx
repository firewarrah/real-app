import PageHeader from "./common/pageHeader";
import Form from "./common/form";
import Joi from "joi-browser";
import cardService from "../services/cardService";
import { toast } from "react-toastify";

class EditCard extends Form {
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

  async componentDidMount() {
    const cardId = this.props.match.params.id;
    const { data } = await cardService.getCard(cardId);
    this.setState({ data: this.viewMyCard(data) });
  }

  viewMyCard(card) {
    return {
      _id: card._id,
      bizName: card.bizName,
      bizDescription: card.bizDescription,
      bizAddress: card.bizAddress,
      bizPhone: card.bizPhone,
      bizImage: card.bizImage,
    };
  }

  async doSubmit() {
    const { bizImage, ...data } = this.state.data;
    if (bizImage) {
      data.bizImage = bizImage;
    }
    await cardService.updateCard(data);
    toast("This card is updated");
    this.props.history.replace("/my-cards");
  }
  handleCancel = () => {
    this.props.history.push("/my-cards");
  };
  schema = {
    _id: Joi.string(),
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
        <PageHeader titleText="Edit Card form" />
        <div className="row">
          <div className="col-12">
            <p>Update a business card</p>
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
              {this.renderButton("Update Card")}
              <button
                className="btn btn-secondary ml-2"
                onClick={this.handleCancel}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditCard;
