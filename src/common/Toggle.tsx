import { useState, useEffect } from 'react';

interface ToggleButtonProps {
  initialState?: boolean;
  todoGroupId?: number;
  onToggle?: (isPublic: boolean) => void;
}

const ToggleButton = ({
  initialState = false,
  todoGroupId,
  onToggle,
}: ToggleButtonProps) => {
  const [isOn, setIsOn] = useState(initialState);

  useEffect(() => {
    setIsOn(initialState);
  }, [initialState]);

  const handleToggle = async () => {
    const newState = !isOn;
    setIsOn(newState);

    if (todoGroupId && onToggle) {
      onToggle(newState);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex h-[24px] w-[46px] items-center rounded-full p-1 duration-300 ${
        isOn ? 'bg-purple-500' : 'bg-gray-400'
      }`}
      aria-pressed={isOn}
      role="switch"
      aria-label="토글 스위치"
    >
      <div
        className={`h-4 w-4 transform rounded-full bg-white shadow-md duration-300 ${
          isOn ? 'translate-x-6' : ''
        }`}
      />
    </button>
  );
};

export default ToggleButton;
