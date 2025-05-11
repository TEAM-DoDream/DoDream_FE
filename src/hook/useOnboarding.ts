import { useState, useMemo } from 'react';

interface StepQuestion {
  step: string;
  questions?: { question: string; options: string[] }[];
}

export function useOnboarding(steps: StepQuestion[]) {
  const [curStep, setCurStep] = useState(0);
  const [curQuestionIndex, setCurQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const currentStepData = steps[curStep];
  const currentQuestionData = currentStepData.questions?.[curQuestionIndex];

  const handleOptionChange = (value: string) => {
    const stepName = currentStepData.step;
    setAnswers((prev) => {
      const arr = [...(prev[stepName] || [])];
      arr[curQuestionIndex] = value;
      return { ...prev, [stepName]: arr };
    });
  };

  const handleNext = () => {
    const totalQ = currentStepData.questions?.length ?? 0;
    if (totalQ > 0 && curQuestionIndex < totalQ - 1) {
      setCurQuestionIndex((q) => q + 1);
    } else {
      setCurStep((s) => s + 1);
      setCurQuestionIndex(0);
    }
  };
  const handlePrev = () => {
    if (curQuestionIndex > 0) {
      setCurQuestionIndex((q) => q - 1);
    } else if (curStep > 0) {
      const prevLen = steps[curStep - 1].questions?.length ?? 1;
      setCurStep((s) => s - 1);
      setCurQuestionIndex(prevLen - 1);
    }
  };

  const stepInfo = useMemo(
    () =>
      steps.map((s) => ({
        title: s.step,
        questionCount: s.questions?.length ?? 1,
      })),
    [steps]
  );

  const totalQuestions = useMemo(() => {
    const total = steps.reduce(
      (sum, st) => sum + (st.questions?.length ?? 1),
      0
    );
    const done =
      steps
        .slice(0, curStep)
        .reduce((sum, st) => sum + (st.questions?.length ?? 1), 0) +
      curQuestionIndex;
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    return { totalQuestions: total, progressPercent: percent };
  }, [steps, curStep, curQuestionIndex]);

  // ← 새로 추가하는 부분
  const buildPayload = () => {
    const payloadAnswers: {
      questionNum: number;
      responses: string[];
    }[] = [];
    let questionNum = 1;

    for (const step of steps) {
      const respArr = answers[step.step] || [];
      const qCount = step.questions?.length ?? 1;
      for (let i = 0; i < qCount; i++) {
        payloadAnswers.push({
          questionNum,
          responses: respArr[i] ? [respArr[i]] : [],
        });
        questionNum++;
      }
    }

    return { answers: payloadAnswers };
  };

  return {
    curStep,
    curQuestionIndex,
    answers,
    currentStepData,
    currentQuestionData,
    handleOptionChange,
    handleNext,
    handlePrev,
    stepInfo,
    totalQuestions,
    // buildPayload 도 함께 반환
    buildPayload,
  } as const;
}
