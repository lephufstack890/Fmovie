import { Link } from 'react-router-dom';
import './PageNotFound.scss'

const PageNotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-blue-400 to-purple-600">
            <div className="text-center text-white">
                <h1 className="text-6xl font-bold mb-4">404</h1>
                <h2 className="text-3xl font-semibold mb-2">Oops! Page not found</h2>
                <p className="text-lg mb-8">The page you are looking for might have been removed or does not exist.</p>
                <Link to="/" className="bg-white hover:bg-purple-700 text-purple-600 font-semibold py-2 px-4 rounded inline-block link-no-underline">
                    Go Home
                </Link>
            </div>
        </div>
    );
};

export default PageNotFound;