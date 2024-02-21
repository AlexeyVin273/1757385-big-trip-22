import AbstractView from '../framework/view/abstract-view';
import { EventTypes } from '../mock/mockEventTypes';
import { getCalendarDateTime } from '../utils/common';
import { getDestinationById } from '../mock/mockDestination';

const createTypesList = (checkedType, eventId) => Object.entries(EventTypes).map(([key, value]) => {
  const { id: typeId, title } = value;
  const checked = key === checkedType ? 'checked' : '';
  return (`
    <div class="event__type-item">
      <input id="event-type-${typeId}-${eventId}" class="event__type-input  visually-hidden" type="radio" name="event-type-${eventId}" value="${key}" ${checked}>
      <label class="event__type-label event__type-label--${key}" for="event-type-${typeId}-${eventId}">${title}</label>
    </div>`);
}).join('');

const createOffersList = (offers, checkedOffers, eventId) => offers.map((offer) => {
  const { id: offerId, title, price } = offer;
  const checked = checkedOffers.has(offerId) ? 'checked' : '';
  return (`
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerId}-${eventId}" type="checkbox" name="event-offer-${title}" ${checked}>
      <label class="event__offer-label" for="event-offer-${offerId}-${eventId}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>
  `);
}).join('');

const createDates = (dateFrom, dateTo, eventId) =>
  `<div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-${eventId}">From</label>
    <input class="event__input  event__input--time" id="event-start-time-${eventId}" type="text" name="event-start-time" value="${getCalendarDateTime(dateFrom)}">
    &mdash;
    <label class="visually-hidden" for="event-end-time-${eventId}">To</label>
    <input class="event__input  event__input--time" id="event-end-time-${eventId}" type="text" name="event-end-time" value="${getCalendarDateTime(dateTo)}">
  </div>
`;

const createDestinations = (destinations, chosenDestination, chosenTypeTitle, eventId) =>
  `<div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-${eventId}">
      ${chosenTypeTitle}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-${eventId}" type="text" name="event-destination" value="${chosenDestination}" list="destination-list-1">
    <datalist id="destination-list-1">
      ${destinations.map((destination) => `<option value=${destination.name}></option>`).join('')}
    </datalist>
  </div>`;

const createEditEventTemplate = ({ destinations, offers, event }) => {
  const { id: eventId, type: eventType, dateFrom, dateTo, basePrice, offers: eventOffers } = event;
  const { icon: typeIcon, title: typeTitle } = EventTypes[eventType] ?? {};
  const { name: destinationName, description } = getDestinationById(event.destination) || {};

  const typesList = createTypesList(eventType, eventId);

  const destinationsNode = createDestinations(destinations, destinationName, typeTitle, eventId);

  const dates = createDates(dateFrom, dateTo, eventId);

  const offersList = createOffersList(offers, new Set(eventOffers), eventId);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${eventId}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${typeIcon}" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${eventId}" type="checkbox">

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${typesList}
              </fieldset>
            </div>
          </div>

          ${destinationsNode}

          ${dates}

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${eventId}">
              <span class="visually-hidden">${basePrice}</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-${eventId}" type="text" name="event-price" value="${basePrice}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers">
              ${offersList}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>
          </section>
        </section>
      </form>
    </li>`
  );
};

export default class EditEventView extends AbstractView {
  #destinations = null;
  #offers = null;
  #event = null;
  #form = null;
  #rollUpBtn = null;
  #handlerFormSubmit = null;
  #handlerFormClose = null;

  constructor({ destinations, offers, event, onFormSubmit, onFormClose }) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
    this.#event = event;
    this.#handlerFormSubmit = onFormSubmit;
    this.#handlerFormClose = onFormClose;

    this.form.addEventListener('submit', this.onFormSubmit);
    this.rollUpBtn.addEventListener('click', this.onRollUpBtnClick);
  }

  get template() {
    return createEditEventTemplate({ destinations: this.#destinations, offers: this.#offers, event: this.#event });
  }

  get form() {
    if (!this.#form) {
      this.#form = this.element.querySelector('form.event');
    }
    return this.#form;
  }

  get rollUpBtn() {
    if (!this.#rollUpBtn) {
      this.#rollUpBtn = this.element.querySelector('.event__rollup-btn');
    }
    return this.#rollUpBtn;
  }

  onFormSubmit = (evt) => {
    evt.preventDefault();
    this.#handlerFormSubmit();
  };

  onRollUpBtnClick = (evt) => {
    evt.preventDefault();
    this.#handlerFormClose();
  };
}
