import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Church } from 'lucide-react';

interface NavLink {
  name: string;
  href: string;
  isRoute?: boolean;
}

const navLinks: NavLink[] = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Nosotros', href: '#nosotros' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Calendario', href: '/calendario', isRoute: true },
  { name: 'Ubicación', href: '#ubicacion' },
  { name: 'Contacto', href: '#contacto' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isCalendarPage = location.pathname === '/calendario';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (link: NavLink) => {
    setIsMobileMenuOpen(false);

    if (link.isRoute) {
      return; // Let the Link component handle it
    }

    // If we're on the calendar page and clicking an anchor, navigate home first
    if (isCalendarPage && link.href.startsWith('#')) {
      navigate('/' + link.href);
    }
  };

  const renderNavLink = (link: NavLink, isMobile = false) => {
    const baseClasses = isMobile
      ? `font-bold text-lg py-3 border-b transition-colors ${
          isScrolled
            ? 'text-primary-900 border-primary-100 hover:text-primary-600'
            : 'text-white border-white/10 hover:text-gold-400'
        } last:border-0`
      : `font-semibold text-sm tracking-wide transition-all shadow-sm ${
          isScrolled
            ? 'text-primary-900 hover:text-primary-600'
            : 'text-white hover:text-gold-400 drop-shadow-md'
        }`;

    const isActive = link.isRoute && location.pathname === link.href;
    const activeClasses = isActive
      ? isScrolled
        ? 'text-primary-600'
        : 'text-gold-400'
      : '';

    if (link.isRoute) {
      return (
        <Link
          key={link.name}
          to={link.href}
          className={`${baseClasses} ${activeClasses}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {isMobile ? (
            link.name
          ) : (
            <motion.span
              className="inline-block"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {link.name}
            </motion.span>
          )}
        </Link>
      );
    }

    // For anchor links
    const href = isCalendarPage ? `/${link.href}` : link.href;

    if (isMobile) {
      return (
        <motion.a
          key={link.name}
          href={href}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className={baseClasses}
          onClick={() => handleNavClick(link)}
        >
          {link.name}
        </motion.a>
      );
    }

    return (
      <motion.a
        key={link.name}
        href={href}
        className={baseClasses}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
        onClick={() => handleNavClick(link)}
      >
        {link.name}
      </motion.a>
    );
  };

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
        <Link to="/" className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-3"
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
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => renderNavLink(link))}
        </nav>

        {/* CTA Button */}
        {isCalendarPage ? (
          <Link
            to="/#contacto"
            className="hidden lg:block btn-gold text-sm"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              Únete a nosotros
            </motion.span>
          </Link>
        ) : (
          <motion.a
            href="#contacto"
            className="hidden lg:block btn-gold text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Únete a nosotros
          </motion.a>
        )}

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
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {renderNavLink(link, true)}
                </motion.div>
              ))}
              {isCalendarPage ? (
                <Link
                  to="/#contacto"
                  className="btn-gold text-center mt-6 py-4 text-base shadow-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Únete a nosotros
                </Link>
              ) : (
                <motion.a
                  href="#contacto"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="btn-gold text-center mt-6 py-4 text-base shadow-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Únete a nosotros
                </motion.a>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
