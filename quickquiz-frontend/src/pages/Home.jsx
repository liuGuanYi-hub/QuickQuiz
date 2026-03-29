import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { user } = useAuth();
    const loggedIn = Boolean(user);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
            <h1 className="text-4xl font-bold text-indigo-600 mb-4 text-center">Welcome to QuickQuiz</h1>
            <p className="text-gray-600 mb-8 text-center max-w-md">
                {loggedIn
                    ? '你已登录，可进入题库管理或智能导入。'
                    : '登录后可同步题库到服务器；未登录时请先注册或登录。'}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
                {loggedIn ? (
                    <>
                        <Link
                            to="/questions"
                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm"
                        >
                            进入题库
                        </Link>
                        <Link
                            to="/import"
                            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-gray-50"
                        >
                            智能导入
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm"
                        >
                            登录
                        </Link>
                        <Link
                            to="/register"
                            className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-lg hover:bg-gray-50"
                        >
                            注册
                        </Link>
                    </>
                )}
            </div>
            {!loggedIn && (
                <p className="mt-8 text-sm text-gray-500">
                    登录后可使用「题库」「智能导入」等需联网保存的功能。
                </p>
            )}
        </div>
    );
};

export default Home;
