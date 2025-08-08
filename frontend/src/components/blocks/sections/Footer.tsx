"use client";

import {
  ArrowUp,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Heart,
  Code,
} from "lucide-react";
import { Button } from "../ui/Button";
import { useState, useEffect } from "react";

export const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show back to top button when user scrolls down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/Prabin70",
      icon: Github,
      hoverColor: "hover:text-gray-300",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: Linkedin,
      hoverColor: "hover:text-blue-400",
    },
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: Twitter,
      hoverColor: "hover:text-blue-400",
    },
    {
      name: "Email",
      href: "mailto:dev.prabinshrestha@gmail.com",
      icon: Mail,
      hoverColor: "hover:text-primary",
    },
  ];

  const technologies = [
    "Next.js",
    "TypeScript",
    "Node.js",
    "React",
    "Tailwind CSS",
    "Shadcn/UI",
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-t border-slate-600">
      {/* Decorative pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3 className="text-lg font-semibold  mb-3 flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                <a href="/" className="text-primary">
                  Prabin Dev.
                </a>
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
                Passionate software engineer crafting exceptional digital
                experiences with modern technologies. Always learning, always
                building.
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">
                Connect
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-muted-foreground transition-all duration-300 transform hover:scale-110 ${link.hoverColor}`}
                      aria-label={link.name}
                    >
                      <IconComponent className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Built With */}
          <div>
            <h4 className="text-sm font-medium text-foreground mb-4">
              Built With
            </h4>
            <div className="space-y-2">
              {technologies.map((tech, index) => (
                <div
                  key={tech}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 cursor-default"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  {tech}
                </div>
              ))}
            </div>

            {/* Built with love */}
            <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
              <span>Made by</span>
              <Heart className="h-3 w-3 text-red-500 animate-pulse" />
              <span>Prabin Shretsha</span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-slate-600">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              <p>© {currentYear} Portfolio. All rights reserved.</p>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <a
                href="#privacy"
                className="hover:text-primary transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <span>•</span>
              <a
                href="#terms"
                className="hover:text-primary transition-colors duration-200"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          size="icon"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
      )}

      {/* Decorative gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </footer>
  );
};
