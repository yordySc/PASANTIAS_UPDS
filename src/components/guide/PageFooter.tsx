import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import logoUPDS from '../../assets/logo-upds.png'

function PageFooter() {
  return (
    <footer id="guide-footer" className="relative z-10 border-t border-white/20 bg-white/[0.96] px-5 py-12 text-slate-600 shadow-[0_-18px_50px_rgba(3,25,58,0.16)]">
      <div className="mx-auto w-full max-w-7xl px-2 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3 items-start">
          <div className="space-y-4">
            <img src={logoUPDS} alt="UPDS" className="h-12 w-auto" />
            <p className="text-sm text-slate-700">Universidad Privada Domingo Savio — Guía oficial de Prácticas Profesionales.</p>
            <div className="flex items-start gap-3 text-sm text-slate-600">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <span>B/ German Busch esquina Fabián Ruiz, Ciudad Tarija, Bolivia</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Phone size={16} />
              <a href="tel:+59175111830" className="transition hover:text-[#2967CD] hover:underline">+591 75111830</a>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-600">
              <Mail size={16} />
              <a href="mailto:infoupds.tarija@upds.edu.bo" className="transition hover:text-[#2967CD] hover:underline">infoupds.tarija@upds.edu.bo</a>
            </div>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-800">Enlaces rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/student" className="transition hover:text-[#2967CD] hover:underline">Empresas</Link></li>
              <li><Link to="/student/success-stories" className="transition hover:text-[#2967CD] hover:underline">Testimonios</Link></li>
              <li><Link to="/guide" className="transition hover:text-[#2967CD] hover:underline">Guía</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-800">Síguenos</h4>
            <p className="mb-3 text-sm text-slate-600">Sigue a la UPDS en redes para mantenerte al día.</p>
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/universidadprivadadomingosaviotarija" target="_blank" rel="noreferrer" aria-label="Facebook UPDS Tarija" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-[#2967CD] hover:text-[#2967CD]">
                <FaFacebookF size={14} />
              </a>
              <a href="https://www.instagram.com/upds_tarija" target="_blank" rel="noreferrer" aria-label="Instagram UPDS Tarija" className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition hover:border-[#2967CD] hover:text-[#2967CD]">
                <FaInstagram size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default PageFooter
