import RoutePresenter from './presenter/route-presenter';
import EventsModel from './model/events-model';

const container = document.querySelector('.page-body');
const eventsModel = new EventsModel();

const routePresenter = new RoutePresenter({container, eventsModel});
routePresenter.init();
