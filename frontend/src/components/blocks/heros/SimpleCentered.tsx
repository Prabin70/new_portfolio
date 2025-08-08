"use client";

import { motion } from "motion/react";
import { Code, Database, Cloud, Server, Download, Eye } from "lucide-react";

export default function SimpleCentered() {
  const techIcons = [
    { Icon: Code, delay: 0 },
    { Icon: Database, delay: 0.2 },
    { Icon: Cloud, delay: 0.4 },
    { Icon: Server, delay: 0.6 },
  ];

  const floatingElements = [
    { text: "React", x: "10%", y: "20%", delay: 0.5 },
    { text: "Node.js", x: "85%", y: "30%", delay: 1 },
    { text: "MongoDB", x: "15%", y: "70%", delay: 1.5 },
    { text: "Docker", x: "80%", y: "65%", delay: 2 },
    { text: "AWS", x: "50%", y: "15%", delay: 2.5 },
  ];

  return (
    <div className="bg-background">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        {/* Animated background gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary/20 to-accent/20 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        {/* Floating tech icons */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {techIcons.map(({ Icon, delay }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.1, scale: 1 }}
              transition={{
                delay,
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 3,
              }}
              className="absolute text-primary/20"
              style={{
                left: `${20 + index * 20}%`,
                top: `${30 + (index % 2) * 40}%`,
              }}
            >
              <Icon size={48} />
            </motion.div>
          ))}
        </div>

        {/* Floating code snippets */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {floatingElements.map(({ text, x, y, delay }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.6, y: 0 }}
              transition={{
                delay,
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 4,
              }}
              className="absolute text-sm font-mono text-muted-foreground/40"
              style={{ left: x, top: y }}
            >
              {text}
            </motion.div>
          ))}
        </div>

        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full border border-primary/20">
                Available for new opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl  tracking-tight text-balance text-foreground sm:text-7xl font-[var(--font-inter)]"
            >
              Full-Stack Developer & DevOps Engineer
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-6 text-xl  text-primary sm:text-2xl font-[var(--font-inter)]"
            >
              Building scalable web solutions with MERN stack and modern DevOps
              practices
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-8 text-lg text-pretty text-muted-foreground sm:text-xl/8 font-[var(--font-inter)]"
            >
              Passionate about creating robust, scalable applications using
              React, Node.js, and MongoDB. Experienced in containerization with
              Docker and cloud deployment on AWS. I bring ideas to life with
              clean code and efficient infrastructure.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-10 flex items-center justify-center gap-x-6"
            >
              <a
                href="#projects"
                className="relative overflow-hidden rounded-md bg-primary px-6 py-3 text-sm  text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200 flex items-center gap-2 font-[var(--font-inter)]"
              >
                <Eye size={18} />
                View Projects
              </a>
              <a
                href="/resume.pdf"
                className="text-sm/6 text-foreground hover:text-primary transition-colors duration-200 flex items-center gap-2 font-[var(--font-inter)]"
                download
              >
                <Download size={18} />
                Download Resume
                <span aria-hidden="true">→</span>
              </a>
            </motion.div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary/20 to-accent/20 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
    </div>
  );
}
