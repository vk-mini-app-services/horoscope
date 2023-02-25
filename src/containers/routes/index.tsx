import { Route, Navigate, Routes, BrowserRouter } from 'react-router-dom';
import { PagesEnum } from '../../types/enums';
import { ROUTE_URL } from '../../utils/constants/app';
import {
  ZodiacCompatibility,
  DemonicHoroscope,
  Home,
  HoroscopeSubscription,
  Notifications,
  Admin
} from '../pages';

export const MainRoutes = () => {
  return (
    <BrowserRouter basename={ROUTE_URL === '' ? '/' : ROUTE_URL}>
      <Routes>
        <Route path={`/${PagesEnum.home}`} element={<Home />} />
        <Route path={`/${PagesEnum.zodiacCompatibility}`} element={<ZodiacCompatibility />} />
        <Route path={`/${PagesEnum.demonicHoroscope}`} element={<DemonicHoroscope />} />
        <Route path={`/${PagesEnum.horoscopeSubscription}`} element={<HoroscopeSubscription />} />
        <Route path={`/${PagesEnum.notifications}`} element={<Notifications />} />
        <Route path={`/${PagesEnum.admin}`} element={<Admin />} />

        {document.location.hash === '#noty' ? (
          <Route path="/" element={<Navigate replace to={`/${PagesEnum.notifications}`} />} />
        ) : (
          <Route path="/" element={<Navigate replace to={`/${PagesEnum.home}`} />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};
