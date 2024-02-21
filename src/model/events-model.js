import { getRandomEvent } from '../mock/mockEvents';
import { getDestinationById, getDestinations } from '../mock/mockDestination';
import { getOfferById, getOffers } from '../mock/mockOffers';
import { filter } from '../utils/filter';

const EVENTS_COUNT = 9;
const OFFERS_COUNT = 5;

export default class EventsModel {
  #events = Array.from({ length: EVENTS_COUNT }, getRandomEvent);
  #offers = getOffers().slice(0, OFFERS_COUNT);
  #destinations = getDestinations();
  #filter = filter;

  get events() {
    return this.#events;
  }

  // getEventById(id) {
  //   return getEventById(id);
  // }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  get filter() {
    return this.#filter;
  }

  getOffersByIds(ids) {
    return ids.map(getOfferById);
  }

  getDestinationById(id) {
    return getDestinationById(id);
  }

  updateEvent(updatedEvent) {
    this.#events = this.#events.map((event) => event.id === updatedEvent.id ? updatedEvent : event);
  }
}
