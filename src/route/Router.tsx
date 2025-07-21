import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import OtherTodoListPage from '@pages/otherTodoList/OtherTodoListPage.tsx';
import OtherTodoMemoPage from '@pages/otherTodoList/OtherTodoMemoPage.tsx';
import MyTodoPage from '@pages/myTodo/MyTodoPage.tsx';
import TodoListPage from '@pages/myTodo/tabs/TodoListPage.tsx';
import ScrapPage from '@pages/myTodo/tabs/ScrapPage.tsx';
import Todo from '@pages/myTodo/components/todo/Todo';
import Mypage from '@pages/mypage/Mypage';
import RequireLogin from '@utils/RequireLogin';
import IdFindPage from '@pages/idFind/IdFindPage.tsx';
import PwdFindPage from '@pages/pwdFind/PwdFindPage.tsx';
import InputVerification from '@pages/inputVerification/InputVerificationPage.tsx';
import FindIdDisplayPage from '@pages/idFind/FindIdDisplayPage.tsx';

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
          <Route path="/others/:jobId" element={<OtherTodoPage />} />
          <Route path="/findid" element={<IdFindPage />} />
          <Route path="/findpwd" element={<PwdFindPage />} />
          <Route path="/verifcation" element={<InputVerification />} />
          <Route path="/resultId" element={<FindIdDisplayPage />} />
          <Route
            path="/otherslist/:todoGroupId"
            element={<OtherTodoListPage />}
          />
          <Route
            path="/othertodo/memo/:todoId"
            element={<OtherTodoMemoPage />}
          />

          <Route
            path="/mytodo"
            element={
              <RequireLogin>
                <MyTodoPage />
              </RequireLogin>
            }
          >
            <Route index element={<Navigate to="/mytodo/list" replace />} />
            <Route path="list" element={<Todo />} />
            <Route path="add/:todoGroupId" element={<TodoListPage />} />
            <Route path="edit/:todoId" element={<TodoListPage />} />
            <Route path="memo/:todoId" element={<TodoListPage />} />
            <Route path="scrap" element={<ScrapPage />}>
              <Route
                index
                element={<Navigate to="/mytodo/scrap/job" replace />}
              />
              <Route path="job" element={<ScrapPage />} />
              <Route path="edu" element={<ScrapPage />} />
            </Route>
          </Route>
          <Route path="/mypage" element={<Mypage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
