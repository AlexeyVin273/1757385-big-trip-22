import EventView from '../view/event-view';
import EditEventView from '../view/edit-event-view';
import { remove, render, replace } from '../framework/render';

const EventMode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class EventPresenter {
  #parentContainer = null;
  #eventsModel = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #event = null;
  #eventComponent = null;
  #eventEditComponent = null;
  #mode = EventMode.DEFAULT;

  constructor({ parentContainer, model, onDataChange, onModeChange }) {
    this.#parentContainer = parentContainer;
    this.#eventsModel = model;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(event) {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventView({
      event: this.#event,
      offers: this.#eventsModel.getOffersByIds(this.#event.offers),
      destination: this.#eventsModel.getDestinationById(this.#event.destination),
      onRollUpBtnClick: this.#replaceCardToForm,
      onFavoriteClick: this.#handleFavouriteClick,
    });

    this.#eventEditComponent = new EditEventView({
      event: this.#event,
      onFormSubmit: this.#replaceFormToCard,
      onFormClose: this.#replaceFormToCard,
    });

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#parentContainer.element);
      return;
    }

    if (this.#mode === EventMode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === EventMode.EDITING) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

  resetView() {
    this.#replaceFormToCard();
    this.#eventEditComponent.reset(this.#event);
  }

  get mode() {
    return this.#mode;
  }

  #escKeydownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#eventEditComponent.reset(this.#event);
      this.#replaceFormToCard();
    }
  };

  #replaceCardToForm = () => {
    replace(this.#eventEditComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeydownHandler);
    this.#handleModeChange();
    this.#mode = EventMode.EDITING;
  };

  #replaceFormToCard = () => {
    replace(this.#eventComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#escKeydownHandler);
    this.#mode = EventMode.DEFAULT;
  };

  #handleFavouriteClick = () => {
    this.#handleDataChange({ ...this.#event, isFavorite: !this.#event.isFavorite });
  };
}

export { EventMode };
