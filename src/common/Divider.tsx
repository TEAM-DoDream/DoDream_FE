interface DividerProps {
  className?: string;
}

const Divider = ({ className }: DividerProps) => {
  return <div className={`h-px w-full bg-gray-300 ${className ?? ''}`} />;
};

export default Divider;
