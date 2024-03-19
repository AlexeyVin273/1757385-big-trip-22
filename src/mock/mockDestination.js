const mockDestinations = [
  {
    id: '1',
    description: 'Amsterdam, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna.',
    name: 'Amsterdam',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563007163317',
        description: 'Amsterdam Lorem ipsum dolor sit amet'
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005263316',
        description: 'Amsterdam Lorem ipsum dolor sit amet'
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163415',
        description: 'Amsterdam Lorem ipsum dolor sit amet'
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563105163314',
        description: 'Amsterdam Lorem ipsum dolor sit amet'
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762583005163313',
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
        src: 'http://picsum.photos/300/200?r=0.0762563005163417',
        description: 'Amsterdam Lorem ipsum dolor sit amet'
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163326',
        description: 'Amsterdam Lorem ipsum dolor sit amet'
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163915',
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
        src: 'http://picsum.photos/300/200?r=0.0762563005463317',
        description: 'Amsterdam Lorem ipsum dolor sit amet'
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563002163316',
        description: 'Amsterdam Lorem ipsum dolor sit amet'
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563015163315',
        description: 'Amsterdam Lorem ipsum dolor sit amet'
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762863005163314',
        description: 'Amsterdam Lorem ipsum dolor sit amet'
      },
    ]
  },
];

export const getDestinations = () => mockDestinations;

export const getDestinationById = (id) => mockDestinations.find((dest) => dest.id === id);

export const getDestinationId = (name) => mockDestinations.find((dest) => dest.name === name)?.id;
