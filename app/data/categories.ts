// contracts/category.ts
export interface Category {
  id: number
  name: string
  timestamps: Date
}

// // data/category.ts
// import { Category } from '#contracts/category'

let categories: Category[] = [
  { id: 1, name: 'Electronics', timestamps: new Date("25-01-25") },
  { id: 2, name: 'Clothing', timestamps: new Date("25-01-25") },
  { id: 3, name: 'Books', timestamps: new Date("25-01-25") },
  { id: 4, name: 'Home & Living', timestamps: new Date("25-01-25") },
]

export function getAllCategories(): Category[] {
  return [...categories]
}

export function getCategoryById(id: number): Category | undefined {
  return categories.find((c) => c.id === id)
}