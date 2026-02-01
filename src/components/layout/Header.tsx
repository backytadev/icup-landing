import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  Church,
  Home,
  Users,
  Clock,
  Calendar,
  MapPin,
  Phone,
  ChevronRight,
} from 'lucide-react';

interface NavLink {
  name: string;
  href: string;
  isRoute?: boolean;
  icon: React.ElementType;
}

const navLinks: NavLink[] = [
  { name: 'Inicio', href: '#inicio', icon: Home },
  { name: 'Nosotros', href: '#nosotros', icon: Users },
  { name: 'Servicios', href: '#servicios', icon: Clock },
  { name: 'Calendario', href: '/calendario', isRoute: true, icon: Calendar },
  { name: 'Ubicación', href: '#ubicacion', icon: MapPin },
  { name: 'Contacto', href: '#contacto', icon: Phone },
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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (link: NavLink) => {
    setIsMobileMenuOpen(false);

    if (link.isRoute) {
      return;
    }

    if (isCalendarPage && link.href.startsWith('#')) {
      navigate('/' + link.href);
    }
  };

  const renderDesktopNavLink = (link: NavLink) => {
    const baseClasses = `font-semibold text-sm tracking-wide transition-colors md:hover:-translate-y-0.5 md:transition-transform ${
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
        >
          {link.name}
        </Link>
      );
    }

    const href = isCalendarPage ? `/${link.href}` : link.href;

    return (
      <a
        key={link.name}
        href={href}
        className={`${baseClasses} ${activeClasses}`}
      >
        {link.name}
      </a>
    );
  };

  const renderMobileNavLink = (link: NavLink) => {
    const isActive = link.isRoute && location.pathname === link.href;
    const Icon = link.icon;

    const linkContent = (
      <div
        className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${
          isActive
            ? 'bg-primary-600 text-white'
            : 'bg-white/5 text-white hover:bg-white/10'
        }`}
      >
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            isActive ? 'bg-white/20' : 'bg-white/10'
          }`}
        >
          <Icon size={20} />
        </div>
        <span className="flex-1 font-semibold">{link.name}</span>
        <ChevronRight
          size={18}
          className={isActive ? 'text-white/70' : 'text-white/40'}
        />
      </div>
    );

    if (link.isRoute) {
      return (
        <Link
          key={link.name}
          to={link.href}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {linkContent}
        </Link>
      );
    }

    const href = isCalendarPage ? `/${link.href}` : link.href;

    return (
      <a key={link.name} href={href} onClick={() => handleNavClick(link)}>
        {linkContent}
      </a>
    );
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass shadow-lg py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="flex items-center gap-3">
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
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => renderDesktopNavLink(link))}
          </nav>

          {/* CTA Button */}
          {isCalendarPage ? (
            <Link to="/#contacto" className="hidden lg:block btn-gold text-sm">
              Únete a nosotros
            </Link>
          ) : (
            <a href="#contacto" className="hidden lg:block btn-gold text-sm">
              Únete a nosotros
            </a>
          )}

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 relative z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="text-white" size={28} />
            ) : (
              <Menu
                className={isScrolled ? 'text-primary-700' : 'text-white'}
                size={28}
              />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu - Full Screen Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950" />

        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 -left-20 w-64 h-64 bg-gold-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-40 -right-20 w-80 h-80 bg-primary-400/10 rounded-full blur-3xl" />
        </div>

        {/* Content */}
        <div
          className={`relative h-full flex flex-col pt-24 pb-8 px-6 transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-y-0' : '-translate-y-8'
          }`}
        >
          {/* Logo and tagline */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 mb-4 shadow-lg shadow-gold-500/30">
              <Church className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-heading font-black text-2xl text-white mb-1">
              ICUP
            </h2>
            <p className="text-white/60 text-sm">Unidos en su Presencia</p>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-2 overflow-y-auto">
            {navLinks.map((link) => renderMobileNavLink(link))}
          </nav>

          {/* CTA Section */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-white/50 text-xs text-center mb-4 uppercase tracking-wider">
              ¿Listo para visitarnos?
            </p>
            {isCalendarPage ? (
              <Link
                to="/#contacto"
                className="block w-full py-4 px-6 bg-gradient-to-r from-gold-400 to-gold-500 text-white font-bold text-center rounded-2xl shadow-lg shadow-gold-500/30"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Únete a nosotros
              </Link>
            ) : (
              <a
                href="#contacto"
                className="block w-full py-4 px-6 bg-gradient-to-r from-gold-400 to-gold-500 text-white font-bold text-center rounded-2xl shadow-lg shadow-gold-500/30"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Únete a nosotros
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
