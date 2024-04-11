import AbstractView from '../framework/view/abstract-view';

const createFiltersItemTemplate = (filter, isChecked) => {
  const checked = isChecked ? 'checked' : '';
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${checked}>
      <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
    </div>`
  );
};

function createFiltersTemplate({ filters, currentFilter }) {
  const filtersItems = filters.map((filter) => createFiltersItemTemplate(filter, filter === currentFilter)).join('');
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersItems}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`);
}

export default class FiltersView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({ filters, currentFilter, onFilterTypeChange }) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilter;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createFiltersTemplate({ filters: this.#filters, currentFilter: this.#currentFilter });
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
