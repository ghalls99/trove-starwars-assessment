import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Search from './Pages/Search';
import Profile from './Pages/Profile';
import {ErrorProvider} from './Components/ErrorContext';
import ErrorBanner from './Components/ErrorBanner';

// Isolate all routes into own environment
function AppRouter() {
	return (
		<ErrorProvider>
			<Router>
				<ErrorBanner />
				<Routes>
					<Route path='/' element={<Search />} />
					<Route path='/profile/:id' element={<Profile />} />
				</Routes>
			</Router>
		</ErrorProvider>
	);
}

export default AppRouter;
