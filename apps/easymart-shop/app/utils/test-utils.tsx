import type { ReactElement, ReactNode } from 'react'
import { render, type RenderOptions } from '@testing-library/react'

import { I18nTestProvider } from '~/i18n/providers'

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return <I18nTestProvider>{children}</I18nTestProvider>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
