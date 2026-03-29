import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
            }
        ]
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
