import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { EventTypes } from '../mock/mockEventTypes';
import { getCalendarDateTime, convertToISO, compareDates } from '../utils/common';
import { getDestinationById, getDestinations, getDestinationId } from '../mock/mockDestination';
import { getOfferById } from '../mock/mockOffers';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

const createTypesList = (checkedType, eventId) => Object.entries(EventTypes).map(([key, value]) => {
  const { id: typeId, title } = value;
  const checked = key === checkedType ? 'checked' : '';
  return (`
    <div class="event__type-item">
      <input id="event-type-${typeId}-${eventId}" class="event__type-input  visually-hidden" type="radio" name="event-type-${eventId}" value="${key}" ${checked}>
      <label class="event__type-label event__type-label--${key}" for="event-type-${typeId}-${eventId}">${title}</label>
    </div>`);
}).join('');

const createOffersList = (offers, checkedOffers, eventId) => {
  const offersList = offers.map((offer) => {
    const { id: offerId, title, price } = offer;
    const checked = checkedOffers.has(offerId) ? 'checked' : '';
    return (`
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offerId}-${eventId}" type="checkbox" name="event-offer-${offerId}-${eventId}" ${checked} data-offer-id=${offerId}>
        <label class="event__offer-label" for="event-offer-${offerId}-${eventId}">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>
    `);
  }).join('');

  return offersList.length ? `
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

    <div class="event__available-offers">${offersList}</div>
  </section>
  ` : '';
};

const createDates = (dateFrom, dateTo, eventId) =>
  `<div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-${eventId}">From</label>
    <input class="event__input  event__input--time" id="event-start-time-${eventId}" type="text" name="event-start-time-${eventId}" value="${getCalendarDateTime(dateFrom)}">
    &mdash;
    <label class="visually-hidden" for="event-end-time-${eventId}">To</label>
    <input class="event__input  event__input--time" id="event-end-time-${eventId}" type="text" name="event-end-time-${eventId}" value="${getCalendarDateTime(dateTo)}">
  </div>
`;

const createDestinations = (destinations, chosenDestination, chosenTypeTitle, eventId) =>
  `<div class="event__field-group  event__field-group--destination">
    <label class="event__label event__type-output" for="event-destination-${eventId}">
      ${chosenTypeTitle}
    </label>
    <input class="event__input event__input--destination" id="event-destination-${eventId}" type="text" name="event-destination" value="${chosenDestination}" list="destination-list-1">
    <datalist id="destination-list-1">
      ${destinations.map((destination) => `<option value=${destination.name}></option>`).join('')}
    </datalist>
  </div>`;

const createDescription = ({description, pictures}) => {
  const picturesList = pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`).join('');
  const picturesNode = picturesList.length && `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${picturesList}
      </div>
    </div>`;

  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">${description}</p>
      ${picturesNode}
    </section>`
  );
};

const isSubmitDisabled = (data) => {
  const { destination, type, offers, offersList, destinationId, typeId } = data;
  return destinationId === destination && typeId === type && offersList.length === offers.length && offers.every((value) => offersList.includes(value)) && data.dateFrom === data.prevDateFrom && data.dateTo === data.prevDateTo;
};

const createEditEventTemplate = (data) => {
  const { id: eventId, type: eventType, dateFrom, dateTo, basePrice, offers: eventOffers } = data;
  const { icon: typeIcon, title: typeTitle, offers: offersIds } = EventTypes[eventType] ?? {};
  const { name: destinationName, description, pictures } = getDestinationById(data.destination) || {};
  const offers = offersIds.map((offerId) => getOfferById(offerId));
  const destinations = getDestinations();

  const typesList = createTypesList(eventType, eventId);
  const destinationsNode = createDestinations(destinations, destinationName, typeTitle, eventId);
  const dates = createDates(dateFrom, dateTo, eventId);
  const offersNode = createOffersList(offers, new Set(eventOffers), eventId);
  const descriptionNode = createDescription({description, pictures});

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

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled(data) ? 'disabled' : ''}>Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
          ${offersNode}
          ${descriptionNode}
        </section>
      </form>
    </li>`
  );
};

export default class EditEventView extends AbstractStatefulView {
  #event = null;
  #form = null;
  #rollUpBtn = null;
  #handlerFormSubmit = null;
  #handlerFormClose = null;
  #handleDeleteClick = null;
  #datepickerStart = null;
  #datepickerEnd = null;

  constructor({ event, onFormSubmit, onFormClose, onDeleteClick }) {
    super();
    this.#event = event;
    this.#handlerFormSubmit = onFormSubmit;
    this.#handlerFormClose = onFormClose;
    this.#handleDeleteClick = onDeleteClick;
    this._setState(EditEventView.parseEventToState(event));

    this._restoreHandlers();
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerStart) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;
    }

    if (this.#datepickerEnd) {
      this.#datepickerEnd.destroy();
      this.#datepickerEnd = null;
    }
  }

  reset(event) {
    this.updateElement(EditEventView.parseEventToState(event));
  }

  _restoreHandlers() {
    this.form.addEventListener('submit', this.#onFormSubmit);
    this.rollUpBtn.addEventListener('click', this.#onRollUpBtnClick);
    this.element.querySelector('.event__input--destination').addEventListener('input', this.#destinationHandler);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#typeHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#formDeleteClickHandler);

    const offers = this.element.querySelector('.event__available-offers');
    if (offers) {
      offers.addEventListener('change', this.#offersHandler);
    }

    this.#setDatepickers();
  }

  get template() {
    return createEditEventTemplate(this._state);
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

  static parseEventToState(event) {
    return {...event,
      offersList: event.offers.map((offer) => offer),
      destinationId: event.destination,
      typeId: event.type,
      prevDateFrom: event.dateFrom,
      prevDateTo: event.dateTo,
    };
  }

  static parseStateToEvent(state) {
    const event = {...state};
    delete event.offersList;
    delete event.destinationId;
    delete event.typeId;
    delete event.prevDateFrom;
    delete event.prevDateTo;

    return event;
  }

  #onFormSubmit = (evt) => {
    evt.preventDefault();
    this.#handlerFormSubmit(EditEventView.parseStateToEvent(this._state));
  };

  #onRollUpBtnClick = (evt) => {
    evt.preventDefault();
    this.#handlerFormClose();
  };

  #destinationHandler = (evt) => {
    evt.preventDefault();
    const destinationId = getDestinationId(evt.target.value);
    if (destinationId) {
      this.updateElement({destination: destinationId});
    }
  };

  #typeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({type: evt.target.value, offers: []});
  };

  #offersHandler = (evt) => {
    evt.preventDefault();
    const offerId = evt.target.dataset.offerId;
    const offers = new Set(this._state.offers);

    if (evt.target.checked) {
      offers.add(offerId);
    } else {
      offers.delete(offerId);
    }

    this.updateElement({offers: [...offers]});
  };

  #setDatepickers = () => {
    const dateInputFrom = this.element.querySelector('[id^="event-start-time"]');
    const dateInputTo = this.element.querySelector('[id^="event-end-time"]');

    if (dateInputFrom) {
      this.#datepickerStart = flatpickr(dateInputFrom, {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        onChange: this.#dateStartChangeHandler,
      });
    }

    if (dateInputTo) {
      this.#datepickerEnd = flatpickr(dateInputTo, {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        onChange: this.#dateEndChangeHandler,
      });
    }

    this.#datepickerEnd.set('minDate', this.#datepickerStart.selectedDates[0]);
  };

  #dateStartChangeHandler = (selectedDates) => {
    let dateTo = this._state.dateTo;
    if (compareDates(this.#datepickerEnd.selectedDates[0], selectedDates[0])) {
      this.#datepickerEnd.setDate(selectedDates[0]);
      dateTo = convertToISO(selectedDates[0]);
    }
    this.#datepickerEnd.set('minDate', selectedDates[0]);
    this.updateElement({dateFrom: convertToISO(selectedDates[0]), dateTo: dateTo});
  };

  #dateEndChangeHandler = (selectedDates) => {
    this.updateElement({dateTo: convertToISO(selectedDates[0])});
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EditEventView.parseStateToEvent(this._state));
  };
}
