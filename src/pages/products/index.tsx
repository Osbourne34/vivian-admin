import React, { ReactElement } from 'react'

import { MainLayout } from '@/shared/layout/main-layout/main-layout'

const Products = () => {
  return <div>Products</div>
}

Products.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>
}

export default Products
