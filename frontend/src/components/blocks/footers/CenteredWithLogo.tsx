import { cn } from "../../lib/utils";
import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import React from "react";

export function CenteredWithLogo() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-slate-900 px-8 py-16 w-full">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center w-full space-y-8">
          {/* Logo/Name */}
          <div>
            <Link
              href="/"
              className="font-bold text-2xl text-slate-50 hover:text-emerald-400 transition-colors"
            >
              JS
            </Link>
          </div>

          {/* Tagline */}
          <p className="text-slate-400 text-sm text-center">
            Built with Next.js, deployed on Vercel
          </p>

          {/* Divider */}
          <div className="w-24 h-px bg-slate-600"></div>

          {/* Social Links */}
          <div className="flex gap-6">
            <Link
              href="https://github.com"
              className="text-slate-400 hover:text-emerald-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://linkedin.com"
              className="text-slate-400 hover:text-emerald-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://twitter.com"
              className="text-slate-400 hover:text-emerald-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-slate-400 text-sm text-center">
            © {currentYear} All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
