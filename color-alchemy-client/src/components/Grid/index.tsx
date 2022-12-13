interface GridProps {
  children: React.ReactNode;
  columns: string;
}

export function Grid({ children, columns = "6" }: GridProps) {
  return (
    <div
      className="grid gap-1"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {children}
    </div>
  );
}

export default Grid;
