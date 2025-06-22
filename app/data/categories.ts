export interface Category {
  id: number
  name: string
  timestamps: Date
}



let categories: Category[] = [
  { id: 1, name: 'Electronics', timestamps: new Date('2025-01-25') },
  { id: 2, name: 'Clothing', timestamps: new Date('2025-01-25') },
  { id: 3, name: 'Books', timestamps: new Date('2025-01-25') },
  { id: 4, name: 'Home & Living', timestamps: new Date('2025-01-25') },
]

export function getAllCategories(): Category[] {
  return [...categories]
}

export function getCategoryById(id: number): Category | undefined {
  return categories.find((c) => c.id === id)
}

export function addCategory(data: { name: string }) {
  const newCategory = {
    id: categories.length ? Math.max(...categories.map(c => c.id)) + 1 : 1,
    name: data.name,
    timestamps: new Date()
  }
  categories.push(newCategory)
  return newCategory
}

export function updateCategory(id: number, name: string): boolean {
  const category = categories.find(c => c.id === id)
  if (!category) return false
  category.name = name
  return true
}

export function deleteCategory(id: number): boolean {
  const index = categories.findIndex(c => c.id === id)
  if (index === -1) return false
  categories.splice(index, 1)
  return true
}