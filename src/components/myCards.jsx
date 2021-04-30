import React, { Component } from "react";
import PageHeader from "./common/pageHeader";
import cardService from "../services/cardService";
import Card from "./Card";
import { Link } from "react-router-dom";

class myCards extends Component {
  state = {
    cards: [],
    errors: {},
  };

  async componentDidMount() {
    try {
      const { data } = await cardService.getAllCards();
      if (data.length > 0) this.setState({ cards: data });
    } catch (err) {
      if (err.response && err.response.status === 401) {
        this.setState({ errors: { cards: "No cards to show you my friend" } });
      }
    }
  }

  render() {
    const { cards } = this.state;
    return (
      <div className="container">
        <PageHeader titleText="My Cards Page" />
        <div className="row">
          <div className="col-12">
            <p>Your Cards are in the list below</p>
            <p>
              <Link className="btn btn-primary" to="/create-card">
                Create a New Card
              </Link>
            </p>
          </div>
        </div>
        <div className="row">
          {cards.length ? (
            cards.map((card) => <Card key={card._id} card={card} />)
          ) : (
            <div className="col-12 text-muted">No cards create a card</div>
          )}
        </div>
      </div>
    );
  }
}

export default myCards;
