import { useMemo } from 'react'
interface GridProps {
  children: React.ReactNode
  columns: string
}

export function Grid({ children, columns }: GridProps) {
  const style = useMemo(() => {
    return {
      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
    }
  }, [columns])

  return (
    <div className='grid gap-1' style={style}>
      {children}
    </div>
  )
}

export default Grid
