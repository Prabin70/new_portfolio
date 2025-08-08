"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import axios from "axios";
import { Badge } from "../ui/Badge";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  MessageSquare,
  Clock,
  CheckCircle,
  User,
  Building,
  Calendar,
} from "lucide-react";
import portfolioConfig from "../../data/portfolio-config.json";
import baseUrl from "@/config/env";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(baseUrl, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ username: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center p-8 bg-green-500/10 border-green-500/20 border rounded-lg"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Message Sent!
        </h3>
        <p className="text-muted-foreground">
          Thank you for reaching out. I'll get back to you within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Name *</label>
          <Input
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Your full name"
            required
            className="border-primary/20 focus:border-primary/40 transition-colors"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Email *</label>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            required
            className="border-primary/20 focus:border-primary/40 transition-colors"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Subject *</label>
        <Input
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="What's this about?"
          required
          className="border-primary/20 focus:border-primary/40 transition-colors"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Message *</label>
        <Textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about your project, question, or how I can help..."
          required
          rows={6}
          className="border-primary/20 focus:border-primary/40 transition-colors resize-none"
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        onClick={handleSubmit}
        className="w-full bg-primary hover:bg-primary/90 transition-all duration-300 disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            <span>Send Message</span>
          </>
        )}
      </Button>
    </form>
  );
};

export const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  } as const;

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: portfolioConfig.contact.email,
      href: `mailto:${portfolioConfig.contact.email}`,
      description: "Best way to reach me",
    },
    {
      icon: Phone,
      label: "Phone",
      value: portfolioConfig.contact.phone,
      href: `tel:${portfolioConfig.contact.phone}`,
      description: "Available during business hours",
    },
    {
      icon: MapPin,
      label: "Location",
      value: portfolioConfig.contact.location,
      href: null,
      description: "Open to remote work",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: portfolioConfig.social.github,
      color: "hover:text-gray-400",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: portfolioConfig.social.linkedin,
      color: "hover:text-blue-400",
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: portfolioConfig.social.twitter,
      color: "hover:text-blue-300",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MessageSquare className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wide">
                Get In Touch
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              {portfolioConfig.contact.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {portfolioConfig.contact.description}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              {/* Contact Methods */}
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={method.label}
                    initial={{ x: -30, opacity: 0 }}
                    animate={inView ? { x: 0, opacity: 1 } : {}}
                    transition={{ delay: 0.1 * index + 0.5 }}
                  >
                    <Card className="border-primary/20 bg-card/80 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 group">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <method.icon className="w-6 h-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground mb-1">
                              {method.label}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-2">
                              {method.description}
                            </p>
                            {method.href ? (
                              <a
                                href={method.href}
                                className="text-primary hover:text-primary/80 transition-colors font-medium"
                              >
                                {method.value}
                              </a>
                            ) : (
                              <span className="text-foreground font-medium">
                                {method.value}
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Availability Info */}
              <motion.div
                variants={itemVariants}
                className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-6 border border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <Badge
                    variant="outline"
                    className="border-green-500/20 text-green-500 bg-green-500/10"
                  >
                    Currently Available
                  </Badge>
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  Availability & Response
                </h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{portfolioConfig.contact.responseTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{portfolioConfig.contact.availability}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Open to discussing new projects</span>
                  </div>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div variants={itemVariants}>
                <Card className="border-primary/20 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold">
                      Connect on Social Media
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      {socialLinks.map((social) => (
                        <motion.a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-3 rounded-lg border border-border hover:border-primary/40 transition-all duration-300 group ${social.color}`}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-current transition-colors" />
                        </motion.a>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      Follow me for updates on projects, tech insights, and
                      industry thoughts.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <Card className="border-primary/20 bg-card/80 backdrop-blur-sm shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                    <Send className="w-6 h-6 text-primary" />
                    Send me a message
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Fill out the form below and I'll get back to you as soon as
                    possible.
                  </p>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <Card className="max-w-2xl mx-auto border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <Building className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Ready to Work Together?
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Whether you have a project in mind, need technical consulting,
                  or want to discuss opportunities, I'd love to hear from you.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    size="lg"
                    className="px-8 py-3 cursor-pointer bg-primary hover:bg-primary/90 transition-all duration-300"
                    onClick={() =>
                      window.open("https://wa.me/9749856214", "_blank")
                    }
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Start a Conversation
                  </Button>

                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-3 cursor-pointer border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                    onClick={() =>
                      window.open(portfolioConfig.personal.resumeUrl, "_blank")
                    }
                  >
                    <User className="w-5 h-5 mr-2" />
                    View Resume
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
