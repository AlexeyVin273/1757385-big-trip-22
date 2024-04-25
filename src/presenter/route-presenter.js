import SortEventsView from '../view/sort-events-view';
import EventsListView from '../view/events-list-view';
import TripInfoView from '../view/trip-info-view';
import NoEventsView from '../view/no-events-views';
import { RenderPosition, remove, render } from '../framework/render';
import EventPresenter, { EventMode } from './event-presenter';
import { SortType, FilterType } from '../utils/const';
import { sortByTime, sortByPrice, sortByDefault } from '../utils/event';
import { UserAction, UpdateType } from '../utils/const';
import { filter } from '../utils/filter';
import NewEventPresenter from './new-event-presenter';

export default class RoutePresenter {
  #container = null;
  #eventsModel = null;
  #filterModel = null;
  #eventsContainer = null;
  #eventsListView = null;
  #sortEventsView = null;
  #noEventsView = null;
  #eventPresenters = new Map();
  #newEventPresenter = null;
  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.EVERYTHING;

  constructor({container, eventsModel, filterModel}) {
    this.#container = container;
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;
    this.#eventsContainer = this.#container.querySelector('.trip-events');

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#newEventPresenter = new NewEventPresenter({
      container,
      onAddButtonClick: this.#handleNewEventButtonClick,
      onDataChange: this.#handleViewAction,
    });
  }

  init() {
    this.#render();
    this.#newEventPresenter.init();
  }

  get events() {
    this.#filterType = this.#filterModel.filter;
    const events = this.#eventsModel.events;
    const filteredEvents = filter[this.#filterType](events);
    switch (this.#currentSortType) {
      case SortType.TIME:
        return filteredEvents.sort(sortByTime);
      case SortType.PRICE:
        return filteredEvents.sort(sortByPrice);
    }

    return filteredEvents.sort(sortByDefault);
  }

  #render() {
    // this.#renderTripInfo();
    if (this.events.length === 0) {
      this.#renderNoEvents();
      return;
    }

    this.#renderSortEvents();
    this.#renderEvents();
  }

  #renderNoEvents() {
    this.#noEventsView = new NoEventsView({filterType: this.#filterType});
    render(this.#noEventsView, this.#eventsContainer);
  }

  #renderTripInfo() {
    const tripInfoContainer = this.#container.querySelector('.trip-main');
    render(new TripInfoView(), tripInfoContainer, RenderPosition.AFTERBEGIN);
  }

  #renderSortEvents() {
    this.#sortEventsView = new SortEventsView({
      currentSortType: this.#currentSortType,
      onSortTypeChanged: this.#handleSortTypeChanged });
    render(this.#sortEventsView, this.#eventsContainer);
  }

  #renderEvents() {
    if (!this.#eventsListView) {
      this.#eventsListView = new EventsListView();
      render(this.#eventsListView, this.#eventsContainer);
    }

    for(const event of this.events) {
      this.#renderEvent(event);
    }
  }

  #renderEvent(event) {
    const eventPresenter = new EventPresenter({
      parentContainer: this.#eventsListView,
      model: this.#eventsModel,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleEventModeChange,
    });

    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  }

  #clear({resetSortType = false} = {}) {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    remove(this.#eventsListView);
    remove(this.#sortEventsView);

    this.#eventsListView = null;
    this.#sortEventsView = null;

    if (this.#noEventsView) {
      remove(this.#noEventsView);
      this.#noEventsView = null;
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  }

  #handleEventChange = (updatedEvent) => {
    this.#eventsModel.updateEvent(updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #handleEventModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.mode !== EventMode.DEFAULT && presenter.resetView());
  };

  #handleSortTypeChanged = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clear();
    this.#render();
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updateEvent(update, updateType);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addEvent(update, updateType);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventsModel.deleteEvent(update, updateType);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clear();
        this.#render();
        break;
      case UpdateType.MAJOR:
        this.#clear({resetSortType: true});
        this.#render();
        break;
    }
  };

  #handleNewEventButtonClick = () => {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);

    if (!this.#eventsListView) {
      this.#eventsListView = new EventsListView();
      render(this.#eventsListView, this.#eventsContainer);
    }
  };
}
