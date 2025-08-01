import { useEffect, useRef } from 'react';
import Stepper from '@pages/onboard/components/Stepper';
import stepQuestions from '@utils/data/onboard/onboardDummy';
import { useOnboarding } from '@hook/useOnboarding';
import Navigation from '@pages/onboard/components/Navigation';
import Questions from '@pages/onboard/components/Questions';
import { useSubmitOnboardAnswers } from '@hook/useOnboardMutation';
import LoadingSpinner from '@common/LoadingSpinner';
import { ReactTagManager } from 'react-gtm-ts';

const OnBoardingPage = () => {
  const {
    curStep,
    curQuestionIndex,
    answers,
    currentStepData,
    currentQuestionData,
    handleOptionChange,
    handleNext,
    handlePrev,
    stepInfo,
    buildPayload,
  } = useOnboarding(stepQuestions);

  const { mutate, isPending } = useSubmitOnboardAnswers();

  // 지연 없이 스텝 변경 시 exit 이벤트가 찍히지 않도록, 언마운트 시점에만 실행
  const stepRef = useRef(curStep);
  const questionRef = useRef(curQuestionIndex);
  useEffect(() => {
    stepRef.current = curStep;
    questionRef.current = curQuestionIndex;
  }, [curStep, curQuestionIndex]);

  useEffect(() => {
    return () => {
      ReactTagManager.action({
        event: 'onboarding_exit',
        category: '온보딩',
        source_page: `2.${stepRef.current + 1}.${questionRef.current + 1}`,
        step: stepRef.current + 1,
        question: questionRef.current + 1,
      });
    };
  }, []);

  const handleSubmit = () => {
    ReactTagManager.action({
      event: 'onboarding_complete',
      category: '온보딩',
      clickText: '온보딩 질문 완료',
      step: curStep + 1,
      question: curQuestionIndex + 1,
    });
    mutate(buildPayload());
  };

  const isLastLicenseQuestion =
    currentQuestionData?.question === '자격증이 필요한 일도 괜찮으신가요?';
  const displayStep = isLastLicenseQuestion
    ? stepQuestions.length - 1
    : curStep;
  const displayQuestionIndex = isLastLicenseQuestion
    ? (stepQuestions[stepQuestions.length - 1].questions?.length || 1) - 1
    : curQuestionIndex;

  return (
    <div className="relative min-h-screen bg-white px-4 py-10">
      {isPending && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70">
          <LoadingSpinner />
        </div>
      )}

      <div className="flex justify-center">
        <div className="w-full max-w-[1500px]">
          <Stepper
            curStep={displayStep}
            curQuestionIndex={displayQuestionIndex}
            steps={stepInfo}
          />
        </div>
      </div>

      <div className="mx-auto mt-10 flex h-[calc(100vh-200px)] w-full max-w-[700px] flex-col">
        {currentQuestionData && (
          <Questions
            question={currentQuestionData.question}
            options={currentQuestionData.options}
            value={answers[currentStepData.step]?.[curQuestionIndex] ?? ''}
            onChange={handleOptionChange}
          />
        )}

        <div className="mt-[20px]">
          <Navigation
            onPrev={handlePrev}
            onNext={handleNext}
            disablePrev={curStep === 0 && curQuestionIndex === 0}
            disableNext={
              curStep < stepQuestions.length - 1 && !currentQuestionData
            }
            isLast={
              isLastLicenseQuestion || curStep === stepQuestions.length - 1
            }
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default OnBoardingPage;
