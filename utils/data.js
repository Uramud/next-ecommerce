//object with in object
import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Rosan',
      email: 'uramudrosan@gmail.com',
      password: bcrypt.hashSync('Uramud07@'),
      isAdmin: true,
    },
    {
      name: 'Dumaru',
      email: 'uramud07@gmail.com',
      password: bcrypt.hashSync('Uramud07@'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'CheckBox Shirt',
      slug: 'checkbox-shirt',
      category: 'Shirts',
      image: '/images/shirt1.jpg',
      price: 20,
      brand: 'Louis Vuitton',
      rating: 4.2,
      numReviews: 10,
      countInStock: 6,
      description: 'Unique shirt',
    },
    {
      name: 'Tie',
      slug: 'tie',
      category: 'Ties',
      image: '/images/tie1.jpg',
      price: 5,
      brand: 'Armani',
      rating: 4.2,
      numReviews: 19,
      countInStock: 4,
      description: 'Unique tie',
    },
    {
      name: 'Jeans Pants',
      slug: 'jeans-pants',
      category: 'Pants',
      image: '/images/pant1.jpg',
      price: 15,
      brand: 'Gucci',
      rating: 3.5,
      numReviews: 4,
      countInStock: 8,
      description: 'Unique pant',
    },
    {
      name: 'Boots',
      slug: 'boots',
      category: 'Shoes',
      image: '/images/shoe1.jpg',
      price: 30,
      brand: 'Timberland',
      rating: 4.5,
      numReviews: 15,
      countInStock: 2,
      description: 'Unique shirt',
    },
    {
      name: 'Watch',
      slug: 'watch',
      category: 'watches',
      image: '/images/watch1.jpg',
      price: 16000,
      brand: 'Rolex',
      rating: 4.9,
      numReviews: 10,
      countInStock: 2,
      description: 'Unique watch',
    },
  ],
};

export default data;
