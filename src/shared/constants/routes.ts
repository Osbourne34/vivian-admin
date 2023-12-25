export const ROUTES = {
  HOME: '/',

  LOGIN: '/login',

  BRANCHES: '/branches',

  CATEGORIES: '/categories',

  CLIENTS: '/clients',
  CREATE_CLIENT: '/clients/create',
  EDIT_CLIENT: (id: number) => `/clients/edit/${id}`,

  COMBO: '/combo',
  CREATE_COMBO: '/combo/create',
  EDIT_COMBO: (id: number) => `/combo/edit/${id}`,

  EMPLOYEES: '/employees',
  CREATE_EMPLOYEES: '/employees/create',
  EDIT_EMPLOYEES: (id: number) => `/employees/edit/${id}`,

  MATERIAL_TYPES: '/material-types',

  MATERIALS: '/materials',
  CREATE_MATERIALS: '/materials/create',
  EDIT_MATERIALS: (id: number) => `/materials/edit/${id}`,

  ORIENTS: '/orients',

  PRICES: '/prices',
  CREATE_PRICES: '/prices/create',
  EDIT_PRICES: (id: number) => `/prices/edit/${id}`,

  PRODUCTS: '/products',
  CREATE_PRODUCTS: '/products/create',
  EDIT_PRODUCTS: (id: number) => `/products/edit/${id}`,

  ROLES: '/roles',

  RECIPES: '/recipes',
  CREATE_RECIPES: '/recipes/create',
  EDIT_RECIPES: (id: number) => `/recipes/edit/${id}`,

  PACKAGES: '/packages',
  CREATE_PACKAGES: '/packages/create',
  EDIT_PACKAGES: (id: number) => `/packages/edit/${id}`,

  SEMIFINISHEDS: '/semi-finisheds',
  CREATE_SEMIFINISHEDS: '/semi-finisheds/create',
  EDIT_SEMIFINISHEDS: (id: number) => `/semi-finisheds/edit/${id}`,
}
