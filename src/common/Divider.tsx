interface DividerProps {
  className?: string;
}

const Divider = ({ className }: DividerProps) => {
  return <div className={`h-px w-full ${className ?? ''}`} />;
};

export default Divider;
