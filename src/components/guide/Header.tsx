import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logoUPDS from "../../assets/logo-upds.png";
import logotipoUPDS from "../../assets/logotipo-upds.png";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const isGuidePage = location.pathname === "/guide";

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const menuLinks = isGuidePage 
        ? [
            { name: "Inicio", path: "#inicio", type: "a" },
            { name: "Información", path: "#informacion", type: "a" },
            { name: "Empresas", path: "/student", type: "link" },
            { name: "Consejos", path: "#consejos", type: "a" },
            { name: "FAQ", path: "#faq", type: "a" }
          ]
        : [
            { name: "Inicio Guía", path: "/guide", type: "link" },
            { name: "Empresas", path: "/student", type: "link" },
            { name: "Casos de Éxito", path: "/student/success-stories", type: "link" }
          ];

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                    scrolled ? "bg-white/90 backdrop-blur-md shadow-lg py-3" : "bg-transparent py-5"
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <Link to="/guide" className="flex items-center gap-3 group">
                        <img src={logoUPDS} className="h-10" />
                        <div>
                            <p className="text-[10px] tracking-[3px] uppercase text-blue-600 font-bold">UPDS</p>
                            <h1 className="font-bold text-lg text-slate-900 leading-none">Domingo Savio</h1>
                        </div>
                    </Link>

                    <nav className="hidden md:flex gap-1 items-center">
                        {menuLinks.map((link) => (
                            <motion.div key={link.name} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                                {link.type === "a" ? (
                                    <a href={link.path} className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors duration-300 relative group">
                                        {link.name}
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                                    </a>
                                ) : (
                                    <Link to={link.path} className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors duration-300 relative group">
                                        {link.name}
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                )}
                            </motion.div>
                        ))}
                    </nav>

                    <button onClick={() => setMenuOpen(true)} className="md:hidden p-2 group">
                        <div className="space-y-1.5">
                            <span className="block w-7 h-0.5 bg-slate-900 transition-all group-hover:w-5"></span>
                            <span className="block w-7 h-0.5 bg-slate-900"></span>
                            <span className="block w-7 h-0.5 bg-slate-900 transition-all group-hover:w-5 ml-auto"></span>
                        </div>
                    </button>
                </div>
            </motion.header>

            <AnimatePresence>
                {menuOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenuOpen(false)} className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm" />
                        <motion.div
                            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 z-[70] flex h-full w-full max-w-md flex-col overflow-hidden bg-[#071d4e] px-6 py-7 shadow-2xl sm:px-10"
                        >
                            <button onClick={() => setMenuOpen(false)} className="absolute top-8 right-8 text-white text-3xl z-50">✕</button>
                            
                            <div className="relative flex justify-center pt-5">
                                <div className="inline-flex bg-white px-5 py-3 shadow-[8px_8px_0_rgba(0,133,252,0.42)]">
                                    <img src={logotipoUPDS} className="h-11 w-auto" alt="UPDS" />
                                </div>
                            </div>
                            
                            <div className="relative mt-16 flex flex-grow flex-col">
                                {menuLinks.map((link, index) => (
                                    <motion.div key={link.name} initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.08 + 0.1 }}>
                                        {link.type === "a" ? (
                                            <a href={link.path} onClick={() => setMenuOpen(false)} className="block py-5 text-2xl font-bold tracking-tight text-white transition-colors hover:text-cyan-200">
                                                {link.name}
                                            </a>
                                        ) : (
                                            <Link to={link.path} onClick={() => setMenuOpen(false)} className="block py-5 text-2xl font-bold tracking-tight text-white transition-colors hover:text-cyan-200">
                                                {link.name}
                                            </Link>
                                        )}
                                    </motion.div>
                                ))}
                                <p className="mt-auto pt-8 text-[10px] font-bold uppercase tracking-[0.24em] text-white/45">Pasantias · Universidad Privada Domingo Savio</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
