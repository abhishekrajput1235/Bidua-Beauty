import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();

  const socials = [
    { icon: Facebook, url: t("footer.socials.facebook") },
    { icon: Twitter, url: t("footer.socials.twitter") },
    { icon: Instagram, url: t("footer.socials.instagram") },
  ];

  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2 text-center sm:text-left">
            <div className="text-2xl sm:text-3xl font-bold mb-4">
              {t("footer.brand.name")}{" "}
              <span className="gradient-text">{t("footer.brand.suffix")}</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md mx-auto sm:mx-0">
              {t("footer.brand.description")}
            </p>
            <div className="flex space-x-4 justify-center sm:justify-start">
              {socials.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.url}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-400 hover:text-black transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold mb-4 gradient-text">
              {t("footer.quickLinks.title")}
            </h3>
            <ul className="space-y-3">
              {t("footer.quickLinks.links", { returnObjects: true }).map(
                (link, idx) =>
                  link.href.startsWith("/") ? (
                    <li key={idx}>
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-amber-400 transition-colors duration-300 text-sm sm:text-base"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ) : (
                    <li key={idx}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-amber-400 transition-colors duration-300 text-sm sm:text-base"
                      >
                        {link.label}
                      </a>
                    </li>
                  )
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold mb-4 gradient-text">
              {t("footer.contact.title")}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center sm:justify-start space-x-3 text-gray-400 hover:text-amber-400 transition-colors duration-300">
                <Mail size={18} />
                <a
                  href={t("footer.contact.email.href")}
                  className="text-sm sm:text-base hover:text-amber-400 transition-colors duration-300"
                >
                  {t("footer.contact.email.label")}
                </a>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-3 text-gray-400 hover:text-amber-400 transition-colors duration-300">
                <Phone size={18} />
                <a
                  href="/contact-us"
                  className="text-sm sm:text-base hover:text-amber-400 transition-colors duration-300"
                >
                  Contact Us
                </a>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-3 text-gray-400 hover:text-amber-400 transition-colors duration-300">
                {/* <MapPin size={0} /> */}
                <button
                  onClick={() =>
                    window.open(t("footer.contact.address.mapUrl"), "_blank")
                  }
                  className="text-sm sm:text-base hover:text-amber-400 transition-colors duration-300 cursor-pointer text-start"
                >
                  {t("footer.contact.address.label")}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              {t("footer.copyright")}
            </p>
            <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6 mt-4 md:mt-0">
              {t("footer.legal", { returnObjects: true }).map((item, index) =>
                item.href.startsWith("/") ? (
                  <Link
                    key={index}
                    to={item.href}
                    className="text-gray-400 hover:text-amber-400 text-xs sm:text-sm transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-amber-400 text-xs sm:text-sm transition-colors duration-300"
                  >
                    {item.label}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
