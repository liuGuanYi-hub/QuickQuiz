import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import QuestionBank from "../pages/QuestionBank";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "../context/AuthContext";
import DashboardLayout from "../layouts/DashboardLayout";
import SmartImportPage from "../pages/Import/SmartImportPage";
import SpacedRepetitionDashboard from "../pages/Review/SpacedRepetitionDashboard";
import ErrorVaultPage from "../pages/Review/ErrorVaultPage";
import MockExamSession from "../pages/Quiz/MockExamSession";
import ExamReport from "../pages/Quiz/ExamReport";
import WebFrontendExam from "../pages/Quiz/WebFrontendExam";

const ProjectManagementExam = lazy(() => import("../pages/Quiz/ProjectManagementExam"));
const ProjectManagementExamIndex = lazy(() => import("../pages/Quiz/ProjectManagementExamIndex"));
const SoftwareTestingExam = lazy(() => import("../pages/Quiz/SoftwareTestingExam"));
const SoftwareTestingExamIndex = lazy(() => import("../pages/Quiz/SoftwareTestingExamIndex"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "/questions",
                element: <QuestionBank />,
            },
            {
                path: "/import",
                element: <SmartImportPage />,
            },
            {
                path: "/review",
                element: <ErrorVaultPage />,
            },
            {
                path: "/analytics",
                element: <SpacedRepetitionDashboard />,
            },
            {
                path: "/error-vault",
                element: <ErrorVaultPage />,
            },
            {
                path: "/exam",
                element: <MockExamSession />,
            },
            {
                path: "/exam/report",
                element: <ExamReport />,
            },
            {
                path: "/web-exam",
                element: <WebFrontendExam />,
            },
            {
                path: "/project-management-exam",
                element: (
                    <Suspense fallback={<div className="p-8 text-slate-500">正在加载项目管理题库…</div>}>
                        <ProjectManagementExamIndex />
                    </Suspense>
                ),
            },
            {
                path: "/project-management-exam/:chapter",
                element: (
                    <Suspense fallback={<div className="p-8 text-slate-500">正在加载章节试卷…</div>}>
                        <ProjectManagementExam />
                    </Suspense>
                ),
            },
            {
                path: "/software-testing-exam",
                element: (
                    <Suspense fallback={<div className="p-8 text-slate-500">正在加载软件测试题库…</div>}>
                        <SoftwareTestingExamIndex />
                    </Suspense>
                ),
            },
            {
                path: "/software-testing-exam/:setId",
                element: (
                    <Suspense fallback={<div className="p-8 text-slate-500">正在加载软件测试试卷…</div>}>
                        <SoftwareTestingExam />
                    </Suspense>
                ),
            }
        ]
    },
    {
        path: "*",
        element: <Navigate to="/" replace />,
    },
]);

const AppRouter = () => {
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
};

export default AppRouter;
