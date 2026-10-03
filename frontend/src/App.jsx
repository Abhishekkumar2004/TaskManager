import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Dashboard from './Pages/Dashboard';
import Login from './Pages/Login';
import Register from './Pages/Register';
import TaskDetails from './Pages/TaskDetails';
import NotFound from './Pages/NotFound';

const App = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route
          path="/log-in"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/tasks/:id"
            element={<TaskDetails />}
          />
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </div>
  );
};

export default App;