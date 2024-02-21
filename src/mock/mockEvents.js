import { getRandomArrayElement } from '../utils/utils';
import { nanoid } from 'nanoid';

const mockPoints = [
  {
    basePrice: 20,
    dateFrom: '2019-03-18T10:30',
    dateTo: '2019-03-18T11:00',
    destination: '1',
    isFavorite: true,
    offers: [
      '1'
    ],
    type: 'taxi'
  },
  {
    basePrice: 160,
    dateFrom: '2019-03-18T12:25',
    dateTo: '2019-03-18T13:35',
    destination: '2',
    isFavorite: false,
    offers: [
      '2',
      '3',
    ],
    type: 'flight'
  },
  {
    basePrice: 160,
    dateFrom: '2019-03-18T14:30',
    dateTo: '2019-03-18T16:05',
    destination: '2',
    isFavorite: true,
    offers: [
      '4',
    ],
    type: 'drive'
  },
  {
    basePrice: 600,
    dateFrom: '2019-03-18T12:25',
    dateTo: '2019-03-18T13:35',
    destination: '2',
    isFavorite: true,
    offers: [
      '5',
    ],
    type: 'check-in'
  },
  {
    basePrice: 50,
    dateFrom: '2019-03-19T11:20',
    dateTo: '2019-03-19T13:00',
    destination: '2',
    isFavorite: false,
    offers: [
      '6',
      '7',
    ],
    type: 'sightseeing'
  },
  {
    basePrice: 20,
    dateFrom: '2019-03-19T10:00',
    dateTo: '2019-03-19T11:00',
    destination: '3',
    isFavorite: false,
    offers: [],
    type: 'drive'
  },
  {
    basePrice: 20,
    dateFrom: '2019-03-19T18:00',
    dateTo: '2019-03-19T19:00',
    destination: '3',
    isFavorite: false,
    offers: [
      '8',
      '9',
    ],
    type: 'flight'
  },
  {
    basePrice: 20,
    dateFrom: '2019-03-20T08:25',
    dateTo: '2019-03-20T09:25',
    destination: '3',
    isFavorite: false,
    offers: [],
    type: 'drive'
  },
  {
    basePrice: 180,
    dateFrom: '2019-03-20T11:15',
    dateTo: '2019-03-20T12:15',
    destination: '3',
    isFavorite: false,
    offers: [],
    type: 'sightseeing'
  },
];

const getRandomEvent = () => (
  {
    id: nanoid(),
    ...getRandomArrayElement(mockPoints),
  }
);

// const getEventById = (id) => mockPoints.find((point) => point.id === id);

export { getRandomEvent };
