import Observable from '../framework/observable';
import { getRandomEvent } from '../mock/mockEvents';
import { getDestinationById, getDestinations } from '../mock/mockDestination';
import { getOfferById, getOffers } from '../mock/mockOffers';

const EVENTS_COUNT = 9;
const OFFERS_COUNT = 5;

export default class EventsModel extends Observable {
  #events = Array.from({ length: EVENTS_COUNT }, getRandomEvent);
  #offers = getOffers().slice(0, OFFERS_COUNT);
  #destinations = getDestinations();

  get events() {
    return this.#events;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  getOffersByIds(ids) {
    return ids.map(getOfferById);
  }

  getDestinationById(id) {
    return getDestinationById(id);
  }

  updateEvent(updatedEvent, updateType) {
    const index = this.#events.findIndex((event) => event.id === updatedEvent.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    this.#events = [...this.#events.slice(0, index), updatedEvent, ...this.#events.slice(index + 1)];
    this._notify(updateType, updatedEvent);
  }

  addEvent(event, updateType) {
    this.#events = [event, ...this.#events];
    this._notify(updateType, event);
  }

  deleteEvent(event, updateType) {
    const index = this.#events.findIndex((item) => item.id === event.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting event');
    }

    this.#events = [...this.#events.slice(0, index), ...this.#events.slice(index + 1)];
    this._notify(updateType);
  }
}
