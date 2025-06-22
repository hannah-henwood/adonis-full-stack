export interface Product {
  id: number
  name: string
  description: string
  price: string
  image_path: string
  category_id: number
  timestamps: Date
}

// Mock Product data
let products: Product[] = [
  {
    id: 1,
    name: 'Adonis Pro Keyboard',
    description: 'A mechanical keyboard with hot-swappable switches and backlit keys, engineered for speed and comfort.',
    price: '89.99',
    image_path: 'keyboard.jpg',
    category_id: 1,
    timestamps: new Date('2025-05-01')
  },
  {
    id: 2,
    name: 'Edge.js Hoodie',
    description: 'Cozy up with this premium cotton hoodie featuring the Edge.js logo. Stylish, soft, and developer-approved.',
    price: '49.99',
    image_path: 'hoodie.jpg',
    category_id: 2,
    timestamps: new Date('2025-05-03')
  },
  {
    id: 3,
    name: 'Adonis Controllers Book',
    description: 'Master routing and request handling in Adonis.js with this detailed and practical developer’s guide.',
    price: '24.95',
    image_path: 'book.jpg',
    category_id: 3,
    timestamps: new Date('2025-05-05')
  },
  {
  id: 4,
  name: 'Minimalist Desk Lamp',
  description: 'A sleek, matte-black LED desk lamp with adjustable brightness and a touch-sensitive base.',
  price: '39.99',
  image_path: 'lamp.jpg',
  category_id: 4,
  timestamps: new Date('2025-05-06')
},
{
  id: 5,
  name: 'TypeScript Mastery Book',
  description: 'Unlock the full power of TypeScript with this advanced guide for building large-scale JavaScript applications.',
  price: '34.95',
  image_path: 'typescript-book.jpg',
  category_id: 3,
  timestamps: new Date('2025-05-07')
},
{
  id: 6,
  name: 'Wireless Charging Mouse Pad',
  description: 'Charge your phone while you work with this dual-purpose leather-textured mouse pad and wireless charger.',
  price: '59.99',
  image_path: 'mousepad.jpg',
  category_id: 1,
  timestamps: new Date('2025-05-07')
},
{
  id: 7,
  name: 'Oversized Dev Tee',
  description: 'Loose-fit t-shirt made for marathon coding sessions. Breathable, stylish, and unapologetically comfy.',
  price: '27.50',
  image_path: 'dev-tee.jpg',
  category_id: 2,
  timestamps: new Date('2025-05-08')
},
{
  id: 8,
  name: 'Nordic Throw Blanket',
  description: 'Snuggle-ready. This soft woven throw adds warmth and texture to your living space.',
  price: '42.00',
  image_path: 'blanket.jpg',
  category_id: 4,
  timestamps: new Date('2025-05-09')
},
{
  id: 9,
  name: 'Ceramic Coffee Mug Set',
  description: 'Set of 4 artisan-style mugs in matte earth tones. Perfect for slow mornings or fast refills.',
  price: '28.00',
  image_path: 'mugs.jpg',
  category_id: 4,
  timestamps: new Date('2025-05-10')
},
{
  id: 10,
  name: 'Woven Storage Basket',
  description: 'Handmade seagrass basket with handles — ideal for blankets, toys, or laundry with flair.',
  price: '35.00',
  image_path: 'basket.jpg',
  category_id: 4,
  timestamps: new Date('2025-05-10')
},
{
  id: 11,
  name: 'Wall Art Print – Abstract Horizon',
  description: 'A calming landscape print in muted blush and sandstone tones to warm up your walls.',
  price: '19.95',
  image_path: 'art.jpg',
  category_id: 4,
  timestamps: new Date('2025-05-11')
},
{
  id: 12,
  name: 'Scented Soy Candle – Vanilla Oak',
  description: 'A hand-poured candle with a wooden wick and a soothing vanilla-oak aroma. Burns ~40 hours.',
  price: '18.50',
  image_path: 'candle.jpg',
  category_id: 4,
  timestamps: new Date('2025-05-12')
},
{
  id: 13,
  name: 'Linen Cushion Cover – Rust Orange',
  description: 'Add a pop of cozy color with this textured linen pillow cover. 45×45cm, insert not included.',
  price: '14.99',
  image_path: 'cushion.jpg',
  category_id: 4,
  timestamps: new Date('2025-05-13')
}
]

// Function to get all posts
export function getAllProducts(): Product[] {
  return [...products]
}

// Function to get a post by ID
export function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id)
}

// Function to create a new post
export function createProduct(post: Omit<Product, 'id' | 'created_at'>): Product {
  const newProduct: Product = {
    id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
    ...post,
    timestamps: post.timestamps ?? new Date()
  }
  
  products.push(newProduct)
  return newProduct
}

// Function to update a post
export function updateProduct(id: number, data: Partial<Omit<Product, 'id' | 'created_at'>>): Product | undefined {
  const index = products.findIndex(product => product.id === id)
  
  if (index === -1) return undefined
  
  products[index] = {
    ...products[index],
    ...data
  } as Product
  
  return products[index]
}


export function deleteProduct(id: number): boolean {
  const index = products.findIndex(p => p.id === id)
  if (index === -1) return false

  products.splice(index, 1)
  return true
}

// Function to mark a post as published
export function publishProduct(id: number): Product | undefined {
  const product = getProductById(id)
  
  if (!product) return undefined
  
  // In a real app, we would set a 'published' field
  // For demo purposes, we'll just modify the title
  product.name = `[PUBLISHED] ${product.name}`
  return product
}
    