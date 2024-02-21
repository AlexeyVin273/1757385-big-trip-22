import { getRandomArrayElement } from '../utils/utils';

const mockOffers = [
  {
    id: '1',
    title: 'Order Uber',
    price: 20,
  },
  {
    id: '2',
    title: 'Add luggage',
    price: 50,
  },
  {
    id: '3',
    title: 'Switch to comfort',
    price: 80,
  },
  {
    id: '4',
    title: 'Rent a car',
    price: 200,
  },
  {
    id: '5',
    title: 'Add breakfast',
    price: 50,
  },
  {
    id: '6',
    title: 'Book tickets',
    price: 40,
  },
  {
    id: '7',
    title: 'Lunch in city',
    price: 30,
  },
  {
    id: '8',
    title: 'Add luggage',
    price: 30,
  },
  {
    id: '9',
    title: 'Switch to comfort',
    price: 100,
  },
  {
    id: '10',
    title: 'Add meal',
    price: 15,
  },
  {
    id: '11',
    title: 'Choose seats',
    price: 5,
  },
  {
    id: '12',
    title: 'Travel by train',
    price: 40,
  },
];

const getOffers = () => mockOffers;

const getOfferById = (id) => mockOffers.find((offer) => offer.id === id);

const getRandomOffer = () => getRandomArrayElement(mockOffers);

export { getOfferById, getOffers, getRandomOffer };
