export interface Post {
  id: number
  title: string
  content: string
  author: string
  created_at: Date
}

// Simulated blog posts data store
let posts: Post[] = [
  {
    id: 1,
    title: 'Getting Started with Adonis.js v6',
    content: 'Adonis.js is a fully-featured web framework for Node.js. It includes everything you need from a web framework, including a router, ORM, authentication system, and more.',
    author: 'John Doe',
    created_at: new Date('2025-05-01')
  },
  {
    id: 2,
    title: 'Understanding Edge.js Templates',
    content: 'Edge.js is the templating engine used by Adonis.js. It provides a clean syntax for rendering HTML views with dynamic data.',
    author: 'Jane Smith',
    created_at: new Date('2025-05-03')
  },
  {
    id: 3,
    title: 'Working with Controllers in Adonis.js',
    content: 'Controllers in Adonis.js help you organize your application logic. They handle incoming requests and return responses.',
    author: 'Alex Johnson',
    created_at: new Date('2025-05-05')
  }
]

// Function to get all posts
export function getAllPosts(): Post[] {
  return [...posts]
}

// Function to get a post by ID
export function getPostById(id: number): Post | undefined {
  return posts.find(post => post.id === id)
}

// Function to create a new post
export function createPost(post: Omit<Post, 'id' | 'created_at'>): Post {
  const newPost: Post = {
    id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
    ...post,
    created_at: new Date()
  }
  
  posts.push(newPost)
  return newPost
}

// Function to update a post
export function updatePost(id: number, data: Partial<Omit<Post, 'id' | 'created_at'>>): Post | undefined {
  const index = posts.findIndex(post => post.id === id)
  
  if (index === -1) return undefined
  
  posts[index] = {
    ...posts[index],
    ...data
  } as Post
  
  return posts[index]
}

// Function to delete a post
export function deletePost(id: number): boolean {
  const initialLength = posts.length
  posts = posts.filter(post => post.id !== id)
  return posts.length < initialLength
}

// Function to mark a post as published
export function publishPost(id: number): Post | undefined {
  const post = getPostById(id)
  
  if (!post) return undefined
  
  // In a real app, we would set a 'published' field
  // For demo purposes, we'll just modify the title
  post.title = `[PUBLISHED] ${post.title}`
  return post
}
    