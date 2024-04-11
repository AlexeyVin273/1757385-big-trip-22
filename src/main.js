import RoutePresenter from './presenter/route-presenter';
import EventsModel from './model/events-model';
import FilterModel from './model/filter-model';
import FilterPresenter from './presenter/filter-presenter';

const container = document.querySelector('.page-body');
const filtersContainer = container.querySelector('.trip-controls__filters');
const eventsModel = new EventsModel();
const filterModel = new FilterModel();

const routePresenter = new RoutePresenter({container, eventsModel, filterModel});
const filterPresenter = new FilterPresenter({container: filtersContainer, filterModel, eventsModel});

filterPresenter.init();
routePresenter.init();
