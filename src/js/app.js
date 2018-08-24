import homePage from './views/tempHomePage.hbs';

const categories = [
    {
        id: 1,
        name: 'Category 1',
        number: 82,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, tempore?'
    },
    {
        id: 2,
        name: 'Category 2',
        number: 32,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, tempore?Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, tempore?'
    },
    {
        id: 3,
        name: 'Category 3',
        number: 12,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, tempore?'
    },
    {
        id: 4,
        name: 'Category 4',
        number: 71,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, tempore?'
    },
    {
        id: 5,
        name: 'Category 5',
        number: 54,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, tempore?Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, tempore?'
    },
    {
        id: 6,
        name: 'Category 6',
        number: 43,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, tempore?'
    },
    {
        id: 7,
        name: 'Category 7',
        number: 19,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, tempore?Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, tempore?'
    },
    {
        id: 8,
        name: 'Category 8',
        number: 91,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, tempore?'
    },
]

const root = document.getElementById('root');
root.innerHTML = homePage(categories);

