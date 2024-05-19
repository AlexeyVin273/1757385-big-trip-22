import ApiService from '../framework/api-service';
import EventAdapter from './event-adapter';

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export default class RouteApiService extends ApiService {
  get events() {
    return this._load({url: 'points'})
      .then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({url: 'destinations'})
      .then(ApiService.parseResponse);
  }

  get offers() {
    return this._load({url: 'offers'})
      .then(ApiService.parseResponse);
  }

  async updateEvent(event) {
    const response = await this._load({
      url: `points/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(EventAdapter.toServer(event)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });


    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async addEvent(event) {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(EventAdapter.toServer(event)),
      // body: JSON.stringify({
      //   'base_price': 1100,
      //   'date_from': '2024-05-19T04:15:54.385Z',
      //   'date_to': '2024-05-20T04:15:54.385Z',
      //   'destination': 'dcc99eb2-fe3e-448a-8be7-1c4836fcd787',
      //   'is_favorite': false,
      //   'offers': [],
      //   'type': 'taxi'
      // }),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  async deleteEvent(event) {
    const response = await this._load({
      url: `points/${event.id}`,
      method: Method.DELETE,
    });

    return response;
  }
}
