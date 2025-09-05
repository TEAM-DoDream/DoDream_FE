interface TagProps {
  context: string;
  fontClass?: string;
  width?: string;
  height?: string;
}

const Tag = ({
  context,
  fontClass = 'font-T05-SB',
  width = 'w-auto',
  height = 'h-auto',
}: TagProps) => {
  return (
    <div
      className={`flex items-center justify-center rounded-[10px] bg-purple-100 p-2 text-purple-500 ${fontClass} ${width} ${height}`}
    >
      {context}
    </div>
  );
};

export default Tag;
