const mockDestinations = [
  {
    id: '1',
    description: 'Amsterdam, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna.',
    name: 'Amsterdam',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Amsterdam Lorem ipsum dolor sit amet'
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163316',
        description: 'Amsterdam Lorem ipsum dolor sit amet'
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163315',
        description: 'Amsterdam Lorem ipsum dolor sit amet'
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163314',
        description: 'Amsterdam Lorem ipsum dolor sit amet'
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163313',
        description: 'Amsterdam Lorem ipsum dolor sit amet'
      },
    ]
  },
  {
    id: '2',
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Amsterdam Lorem ipsum dolor sit amet'
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163316',
        description: 'Amsterdam Lorem ipsum dolor sit amet'
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163315',
        description: 'Amsterdam Lorem ipsum dolor sit amet'
      },
    ]
  },
  {
    id: '3',
    description: 'Geneva, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna.',
    name: 'Geneva',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Amsterdam Lorem ipsum dolor sit amet'
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163316',
        description: 'Amsterdam Lorem ipsum dolor sit amet'
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163315',
        description: 'Amsterdam Lorem ipsum dolor sit amet'
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163314',
        description: 'Amsterdam Lorem ipsum dolor sit amet'
      },
    ]
  },
];

export const getDestinations = () => mockDestinations;

export const getDestinationById = (id) => mockDestinations.find((dest) => dest.id === id);
