import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Church } from 'lucide-react';

const navLinks = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Nosotros', href: '#nosotros' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Ubicación', href: '#ubicacion' },
  { name: 'Contacto', href: '#contacto' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#inicio"
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-700 rounded-full" />
            <Church className="w-6 h-6 text-gold-400 relative z-10" />
          </div>
          <div className="hidden sm:block">
            <h1
              className={`font-heading font-black text-xl leading-tight drop-shadow-sm ${
                isScrolled ? 'text-primary-900' : 'text-white'
              }`}
            >
              ICUP
            </h1>
            <p
              className={`text-[10px] font-bold uppercase tracking-widest ${
                isScrolled ? 'text-primary-600' : 'text-white'
              }`}
            >
              Unidos en su Presencia
            </p>
          </div>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              className={`font-semibold text-sm tracking-wide transition-all shadow-sm ${
                isScrolled
                  ? 'text-primary-900 hover:text-primary-600'
                  : 'text-white hover:text-gold-400 drop-shadow-md'
              }`}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {link.name}
            </motion.a>
          ))}
        </nav>

        {/* CTA Button */}
        <motion.a
          href="#contacto"
          className="hidden lg:block btn-gold text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Únete a nosotros
        </motion.a>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X
              className={isScrolled ? 'text-primary-700' : 'text-white'}
              size={28}
            />
          ) : (
            <Menu
              className={isScrolled ? 'text-primary-700' : 'text-white'}
              size={28}
            />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className={`lg:hidden overflow-hidden ${
              isScrolled ? 'glass' : 'glass-dark'
            }`}
          >
            <nav className="container mx-auto px-6 py-10 flex flex-col gap-6">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`font-bold text-lg py-3 border-b transition-colors ${
                    isScrolled
                      ? 'text-primary-900 border-primary-100 hover:text-primary-600'
                      : 'text-white border-white/10 hover:text-gold-400'
                  } last:border-0`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contacto"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="btn-gold text-center mt-6 py-4 text-base shadow-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Únete a nosotros
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
