import { Route, Navigate, Routes, BrowserRouter } from 'react-router-dom';
import { routeUrl } from '../../utils/constants/app';
import { Notes, Friends, Home } from '../pages';

export const MainRoutes = () => {
  return (
    <BrowserRouter basename={routeUrl === '' ? '/' : routeUrl}>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/" element={<Navigate replace to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
};
