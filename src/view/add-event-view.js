import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { EventTypes } from '../mock/mockEventTypes';
import { getCalendarDateTime, convertToISO, compareDates } from '../utils/common';
import { getDestinationById, getDestinations, getDestinationId } from '../mock/mockDestination';
import { getOfferById } from '../mock/mockOffers';
import flatpickr from 'flatpickr';

const DEFAULT_TYPE_NAME = 'flight';

const createTypesList = (checkedType) => Object.entries(EventTypes).map(([key, value]) => {
  const { id: typeId, title } = value;
  const checked = typeId === checkedType ? 'checked' : '';
  return (`
    <div class="event__type-item">
      <input id="event-type-${typeId}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${key}" ${checked}>
      <label class="event__type-label event__type-label--${key}" for="event-type-${typeId}">${title}</label>
    </div>`);
}).join('');

const createDefaultTypeNode = (defaultType) => `
  <label class="event__type  event__type-btn" for="event-type-toggle-${defaultType.id}">
    <span class="visually-hidden">Choose event type</span>
    <img class="event__type-icon" width="17" height="17" src="img/icons/${defaultType.icon}" alt="Event type icon">
  </label>
  <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${defaultType.id}" type="checkbox">`;

const createDates = (dateFrom, dateTo) =>
  `<div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-adding">From</label>
    <input class="event__input  event__input--time" id="event-start-time-adding" type="text" name="event-start-time" value="${getCalendarDateTime(dateFrom)}">
    &mdash;
    <label class="visually-hidden" for="event-end-time-adding">To</label>
    <input class="event__input  event__input--time" id="event-end-time-edding" type="text" name="event-end-time" value="${getCalendarDateTime(dateTo)}">
  </div>
`;

const createOffersList = (offers) => offers.map((offer) => {
  const { id: offerId, title, price } = offer;
  return (`
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerId}" type="checkbox" name="event-offer-${title}">
      <label class="event__offer-label" for="event-offer-${offerId}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>
  `);
}).join('');

const createDestinations = (destinations, chosenDestination, chosenTypeTitle) =>
  `<div class="event__field-group  event__field-group--destination">
    <label class="event__label  event__type-output" for="event-destination-adding">
      ${chosenTypeTitle}
    </label>
    <input class="event__input  event__input--destination" id="event-destination-adding" type="text" name="event-destination" value="${chosenDestination}" list="destination-list-1">
    <datalist id="destination-list-1">
      ${destinations.map((destination) => `<option value=${destination.name}></option>`).join('')}
    </datalist>
  </div>`;

const createPictureList = (pictures) => pictures.map(({src, description: alt}) => `<img class="event__photo" src=${src} alt=${alt}>`).join('');

const createAddEventTemplate = ({ destinations, offers }) => {
  const { name, description, pictures } = destinations[0];

  const defaultType = EventTypes[DEFAULT_TYPE_NAME];
  const defaultTypeNode = createDefaultTypeNode(defaultType);

  const typesList = createTypesList(DEFAULT_TYPE_NAME);

  const destinationsNode = createDestinations(destinations, name, DEFAULT_TYPE_NAME);
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  const datesNode = createDates(date, date);
  const picturesList = createPictureList(pictures);

  const offersList = createOffersList(offers);

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            ${defaultTypeNode}

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>

                ${typesList}
              </fieldset>
            </div>
          </div>

          ${destinationsNode}

          ${datesNode}

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
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

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${picturesList}
              </div>
            </div>
          </section>
        </section>
      </form>
    </li>`
  );
};

export default class AddEventView extends AbstractStatefulViewView {
  #destinations = null;
  #offers = null;

  constructor({ destinations, offers }) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createAddEventTemplate({ destinations: this.#destinations, offers: this.#offers });
  }
}
