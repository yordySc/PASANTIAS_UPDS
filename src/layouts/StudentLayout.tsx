import { Outlet } from 'react-router-dom';
import Header from '../components/guide/Header';
import AnimatedBackground from '../components/guide/AnimatedBackground';
import PageFooter from '../components/guide/PageFooter';

function StudentLayout() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-gradient-to-br from-[#003366] via-[#1e3a8a] to-[#2967CD]">
      <div className="pointer-events-none absolute inset-0 -z-10"><AnimatedBackground /></div>
      <Header />
      <main className="relative z-10 pt-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <Outlet />
      </main>
      <PageFooter />
    </div>
  );
}

export default StudentLayout;