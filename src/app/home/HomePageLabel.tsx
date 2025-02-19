interface OwnProps {
  children: React.ReactNode;
  id?: string;
}

export function HomePageLabel({ children, id }: OwnProps) {
  return (
    <h2 className="text-xl font-semibold" id={id}>
      {children}
    </h2>
  );
}
