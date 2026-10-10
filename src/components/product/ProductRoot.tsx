'use client'

import { Component, Suspense, type ReactNode } from 'react'
import { USE_REAL_MODEL } from '@/content/assetConfig'
import { PlaceholderProduct } from './PlaceholderProduct'
import { ProductModel } from './ProductModel'

interface ModelBoundaryProps {
  children: ReactNode
  fallback: ReactNode
}

interface ModelBoundaryState {
  hasError: boolean
}

export class ModelBoundary extends Component<ModelBoundaryProps, ModelBoundaryState> {
  state: ModelBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ModelBoundaryState {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) return this.props.fallback
    return this.props.children
  }
}

export function ProductRoot() {
  if (!USE_REAL_MODEL) return <PlaceholderProduct />

  return (
    <ModelBoundary fallback={<PlaceholderProduct />}>
      <Suspense fallback={<PlaceholderProduct />}>
        <ProductModel />
      </Suspense>
    </ModelBoundary>
  )
}
