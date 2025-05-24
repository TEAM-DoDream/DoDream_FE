import { useState, useEffect } from 'react';

interface ToggleButtonProps {
  initialState?: boolean;
  todoId?: number;
  todoGroupId?: number;
  onToggle?: (isPublic: boolean) => void;
}

const ToggleButton = ({ initialState = false, todoId, todoGroupId, onToggle }: ToggleButtonProps) => {
  const [isOn, setIsOn] = useState(initialState);
  
  // initialState가 바뀔 때 내부 상태도 업데이트
  useEffect(() => {
    setIsOn(initialState);
  }, [initialState]);

  const handleToggle = async () => {
    console.log('토글 버튼 클릭됨', { isOn, todoId, todoGroupId });
    const newState = !isOn;
    setIsOn(newState);
    
    if ((todoId || todoGroupId) && onToggle) {
      console.log('onToggle 콜백 호출', { todoId, todoGroupId, newState });
      onToggle(newState);
    } else {
      console.log('onToggle 콜백이 호출되지 않음', { todoId, todoGroupId, onToggle: !!onToggle });
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
