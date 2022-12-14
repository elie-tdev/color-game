import React from 'react'

export function Layout({ children }: { children: React.ReactNode }) {
  return <div className='relative p-4'>{children}</div>
}

export default Layout
