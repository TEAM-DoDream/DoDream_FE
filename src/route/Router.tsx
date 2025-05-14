import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '@pages/login/LoginPage';
import SignupFunnel from '@pages/signup/SignupFunnel';
import HideLayout from '@outlet/HideLayout';
import ShowLayout from '@outlet/ShowLayout';
import OnBoardingPage from '@pages/onboard/OnBoardingPage.tsx';
import Home from '@pages/home/Home';
import JobRecommendPage from '@pages/jobRecommend/JobRecommendPage.tsx';
import JobSearchPage from '@pages/jobSearch/JobSearchPage.tsx';
import LearningPage from '@pages/learning/LearningPage.tsx';
import JobFound from '@pages/jobfound/JobFound';
import JobInfo from '@pages/jobDetail/JobInfo';
import OtherTodoPage from '@pages/otherTodo/OtherTodoPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HideLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupFunnel />} />
        </Route>

        <Route element={<ShowLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/onboard" element={<OnBoardingPage />} />
          <Route path="/jobrecommend" element={<JobRecommendPage />} />
          <Route path="/jobsearch" element={<JobSearchPage />} />
          <Route path="/learning" element={<LearningPage />} />
          <Route path="/jobfound" element={<JobFound />} />
          <Route path="/jobinfo/:jobId" element={<JobInfo />} />
          <Route path="/others" element={<OtherTodoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
