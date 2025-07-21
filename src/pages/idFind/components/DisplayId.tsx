interface IdProps {
  id: string;
}

const DisplayId = ({ id }: IdProps) => {
  return (
    <div className="flex w-[424px] items-center justify-between rounded-2xl bg-gray-50 px-[20px] py-[20px] text-sm">
      <span className="text-gray-500">아이디</span>
      <span className="mr-20 text-gray-900 font-B02-M">{id}</span>
      <span className={'relative'}></span>
    </div>
  );
};

export default DisplayId;
