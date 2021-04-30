import http from "./http";
import { apiUrl } from "../config.json";

export function createCard(card) {
  return http.post(`${apiUrl}/cards`, card);
}
export function getAllCards() {
  return http.get(`${apiUrl}/cards/my-cards`);
}
export function getCard(cardId) {
  return http.get(`${apiUrl}/cards/${cardId}`);
}
export function updateCard(card) {
  const cardId = card._id;
  //delete card._id;
  return http.put(`${apiUrl}/cards/${cardId}`, card);
}
export function deleteCard(cardId) {
  return http.delete(`${apiUrl}/cards/${cardId}`);
}

const service = {
  createCard,
  getAllCards,
  getCard,
  updateCard,
};

export default service;
