import { Outlet } from 'react-router-dom';
import Header from '../components/guide/Header';

function StudentLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="pt-24 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-500">
        © 2026 Universidad Privada Domingo Savio • Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default StudentLayout;