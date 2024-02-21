import AbstractView from '../framework/view/abstract-view';

const createFiltersItem = (filter, isChecked) => {
  const checked = isChecked ? 'checked' : '';
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${checked}>
      <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
    </div>`
  );
};

function createFiltersTemplate({ filters }) {
  const filtersItems = filters.map((filter, index) => createFiltersItem(filter, index === 0)).join('');
  return (
    `<form class="trip-filters" action="#" method="get">
      ${filtersItems}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`);
}

export default class FiltersView extends AbstractView {
  #filters = null;

  constructor({ filters }) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate({ filters: this.#filters });
  }
}
