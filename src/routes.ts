import { createBrowserRouter } from 'react-router';
import { WelcomePage } from './pages/WelcomePage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { ExamCenterPage } from './pages/ExamCenterPage';
import { ExamRoomPage } from './pages/ExamRoomPage';
import { ResultPage } from './pages/ResultPage';
import { ReviewModePage } from './pages/ReviewModePage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { AdminPage } from './pages/AdminPage';
import { QuestionDatabasePage } from './pages/QuestionDatabasePage';
import { MainLayout } from './components/MainLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: WelcomePage,
  },
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/app',
    Component: MainLayout,
    children: [
      { index: true, Component: DashboardPage },
      { path: 'exam-center', Component: ExamCenterPage },
      { path: 'exam/:subjectId', Component: ExamRoomPage },
      { path: 'result/:examId', Component: ResultPage },
      { path: 'review', Component: ReviewModePage },
      { path: 'analytics', Component: AnalyticsPage },
      { path: 'settings', Component: SettingsPage },
      { path: 'admin', Component: AdminPage },
      { path: 'questions', Component: QuestionDatabasePage },
    ],
  },
]);