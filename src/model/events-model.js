import Observable from '../framework/observable';
import EventAdapter from '../net_utils/event-adapter';
import { UpdateType } from '../utils/const';

export default class EventsModel extends Observable {
  #events = [];
  #offers = [];
  #destinations = [];
  #routeApiService = null;

  constructor({routeApiService}) {
    super();
    this.#routeApiService = routeApiService;
  }

  async init() {
    try {
      const events = await this.#routeApiService.events;
      this.#events = events.map(EventAdapter.toClient);
    } catch (err) {
      this.#events = [];
      // eslint-disable-next-line no-console
      console.error(err);
    }

    try {
      this.#destinations = await this.#routeApiService.destinations;
    } catch (err) {
      this.#destinations = [];
      // eslint-disable-next-line no-console
      console.error(err);
    }

    try {
      this.#offers = await this.#routeApiService.offers;
    } catch (err) {
      this.#offers = [];
      // eslint-disable-next-line no-console
      console.error(err);
    }

    this._notify(UpdateType.INIT);
  }

  get events() {
    return this.#events;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  getOffersByType(type) {
    return this.#offers.find((offer) => offer.type === type).offers;
  }

  getOffersForEvent(event) {
    const offers = this.getOffersByType(event.type);
    return offers.filter((offer) => event.offers.includes(offer.id));
  }

  getDestinationById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }

  async updateEvent(update, updateType) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting event');
    }

    try {
      const response = await this.#routeApiService.updateEvent(update);
      const updatedEvent = EventAdapter.toClient(response);
      this.#events = [
        ...this.#events.slice(0, index),
        updatedEvent,
        ...this.#events.slice(index + 1)
      ];
      this._notify(updateType, updatedEvent);
    } catch (err) {
      // eslint-disable-next-line no-console
      throw new Error(`Can't update event: ${err}`);
    }
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
