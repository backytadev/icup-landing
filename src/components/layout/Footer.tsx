import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  Facebook,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Heart,
  Church,
} from 'lucide-react';

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

interface QuickLink {
  name: string;
  href: string;
  isRoute?: boolean;
}

const quickLinks: QuickLink[] = [
  { name: 'Inicio', href: '#inicio' },
  { name: 'Nosotros', href: '#nosotros' },
  { name: 'Servicios', href: '#servicios' },
  { name: 'Calendario', href: '/calendario', isRoute: true },
  { name: 'Ubicación', href: '#ubicacion' },
  { name: 'Contacto', href: '#contacto' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isCalendarPage = location.pathname === '/calendario';

  const renderQuickLink = (link: QuickLink) => {
    if (link.isRoute) {
      return (
        <li key={link.name}>
          <Link
            to={link.href}
            className="text-white/80 hover:text-gold-400 transition-colors text-sm"
          >
            <motion.span whileHover={{ x: 4 }} className="inline-block">
              {link.name}
            </motion.span>
          </Link>
        </li>
      );
    }

    const href = isCalendarPage ? `/${link.href}` : link.href;

    return (
      <li key={link.name}>
        <motion.a
          href={href}
          className="text-white/80 hover:text-gold-400 transition-colors text-sm"
          whileHover={{ x: 4 }}
        >
          {link.name}
        </motion.a>
      </li>
    );
  };

  return (
    <footer className="bg-primary-950 text-white pt-6 md:pt-10 relative z-10 overflow-hidden">
      {/* Main Footer */}
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <Link to="/" className="flex items-center gap-3">
                <div className="relative w-14 h-14 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gold-500 rounded-full" />
                  <Church className="w-7 h-7 text-white relative z-10" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl">ICUP</h3>
                  <p className="text-white/80 text-sm">Unidos en su Presencia</p>
                </div>
              </Link>
            </motion.div>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              Anunciando las buenas nuevas de salvación al mundo. Una comunidad
              de fe, amor y esperanza.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold-400 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">
              Enlaces Rápidos
            </h4>
            <ul className="space-y-3">{quickLinks.map(renderQuickLink)}</ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="text-gold-400 mt-1 flex-shrink-0"
                />
                <span className="text-white/80 text-sm">
                  Av. Valle Sagrado de los Incas 167
                  <br />
                  Independencia, Lima, Perú
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-gold-400 flex-shrink-0" />
                <span className="text-white/80 text-sm">(No disponible)</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gold-400 flex-shrink-0" />
                <span className="text-white/80 text-sm">
                  iglesia@unidosensupresencia.com
                </span>
              </li>
            </ul>
          </div>

          {/* Schedule */}
          <div className="mb-6 md:mb-18">
            <h4 className="font-heading font-semibold text-lg mb-6">
              Horarios de Culto
            </h4>
            <ul className="space-y-3">
              <li className="text-white/80 text-sm">
                <span className="text-white font-bold">Dom (Mañana):</span> 9:00
                AM
              </li>
              <li className="text-white/80 text-sm">
                <span className="text-white font-bold">Dom (Tarde):</span> 4:00
                PM
              </li>
              <li className="text-white/80 text-sm">
                <span className="text-white font-bold">Mar y Jue:</span> 5:00 PM
                | 5:30 PM | 6:00 PM | 7:00 PM | 7:30 PM
              </li>
              <li className="text-white/80 text-sm">
                <span className="text-white font-bold">Sáb (Jóvenes):</span>{' '}
                6:00 PM
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 mx-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-2 mb-2 md:my-2">
            <p className="text-white/50 text-sm text-center md:text-left">
              © {currentYear} Iglesia Cristiana Unidos en su Presencia. Todos
              los derechos reservados.
            </p>
            <p className="text-white/50 text-sm flex items-center gap-1">
              Hecho con <Heart size={14} className="text-gold-400" /> para la
              gloria de Dios
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
