interface TagProps {
  context: string;
}

const Tag = ({ context }: TagProps) => {
  return (
    <div className="flex items-center justify-center rounded-[10px] bg-purple-100 p-2 text-purple-500 font-T05-SB">
      {context}
    </div>
  );
};
export default Tag;
