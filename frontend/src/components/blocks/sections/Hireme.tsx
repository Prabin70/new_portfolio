"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  UserPlus,
  Briefcase,
  Globe,
  X,
} from "lucide-react";
import { BsReverseLayoutSidebarReverse, BsWhatsapp } from "react-icons/bs";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { Textarea } from "../ui/Textarea";

interface FormData {
  companyName: string;
  yourName: string;
  email: string;
  website: string;
  message: string;
}

const Hireme = () => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  // --- State Management ---
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    yourName: "",
    email: "",
    website: "",
    message: "",
  });
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  // --- Data ---
  const skills: string[] = [
    "Single-page Web Application",
    "Full-stack Developer",
    "Docker",
    "Node.js Developer",
    "React.js",
    "Express.js",
    "MongoDB",
    "PostgreSQL",
    "Redis",
    "Frontend Developer",
    "Backend Developer",
    "DevOps",
    "UI/UX",
  ];

  const contactMethods = [
    {
      icon: Mail,
      label: "Email",
      value: "dev.prabinshrestha@gmail.com",
      href: "mailto:dev.prabinshrestha@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+977-9749856214",
      href: "tel:+9779749856214",
    },
    {
      icon: BsWhatsapp,
      label: "WhatsApp",
      value: "Chat on WhatsApp",
      href: "https://wa.me/9779749856214",
    },
    {
      icon: BsReverseLayoutSidebarReverse,
      label: "Viber",
      value: "Chat on Viber",
      href: "viber://chat?number=%2B9779749856214",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Kapan, Kathmandu, Nepal",
      description: "Open to remote opportunities",
    },
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextareaChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSkillSelect = (value: string) => {
    if (value && !selectedSkills.includes(value)) {
      setSelectedSkills([...selectedSkills, value]);
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSelectedSkills(
      selectedSkills.filter((skill) => skill !== skillToRemove)
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    const finalData = { ...formData, requiredSkills: selectedSkills };

    // --- Your Backend Integration Logic Goes Here ---
    // Example: const response = await fetch('/api/hire', { method: 'POST', body: JSON.stringify(finalData) });
    console.log("Submitting form data:", finalData);
    // Simulating API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSubmitStatus("success");
    setFormData({
      companyName: "",
      yourName: "",
      email: "",
      website: "",
      message: "",
    });
    setSelectedSkills([]);

    setIsSubmitting(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <section id="hireme" className="py-20 bg-background text-foreground">
      <div ref={ref} className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <div className="flex items-center flex-col justify-center gap-2 mb-4">
              <UserPlus className="w-6 h-6 text-primary" />
              <h2 className="text-sm font-medium text-primary uppercase tracking-wide">
                HIRE ME
              </h2>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Let's Work Together
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Interested in working together? Please fill out the form below
              with your project details.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left Column: Contact Info */}
            <motion.div variants={itemVariants} className="space-y-6">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.label}
                  initial={{ x: -30, opacity: 0 }}
                  animate={inView ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.1 * index + 0.3 }}
                >
                  <Card className="border-primary/20 bg-card/80 backdrop-blur-sm hover:border-primary/40 transition-all duration-300 group">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <method.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {method.label}
                        </h3>
                        {method.href ? (
                          <a
                            href={method.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 transition-colors font-medium break-all"
                          >
                            {method.value}
                          </a>
                        ) : (
                          <span className="text-foreground font-medium">
                            {method.value}
                          </span>
                        )}
                        {method.description && (
                          <p className="text-muted-foreground text-sm mt-1">
                            {method.description}
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* Right Column: Hire Me Form */}
            <motion.div variants={itemVariants}>
              <Card className="border-primary/20 bg-card/80 backdrop-blur-sm shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                    <Send className="w-6 h-6 text-primary" />
                    Project Details
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Let's build something amazing together.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Form Fields */}
                    <div className="space-y-4">
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          placeholder="Your Company Name"
                          required
                          className="pl-10"
                        />
                      </div>
                      <div className="relative">
                        <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="text"
                          name="yourName"
                          value={formData.yourName}
                          onChange={handleInputChange}
                          placeholder="Your Name"
                          required
                          className="pl-10"
                        />
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Your Email"
                          required
                          className="pl-10"
                        />
                      </div>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                          type="text"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          placeholder="Your Website URL*"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {/* Skill Selector */}
                    <div>
                      <label className="block mb-2 font-medium text-muted-foreground">
                        Your Required Skills
                      </label>
                      <Select onValueChange={handleSkillSelect} value="">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select skills you're looking for..." />
                        </SelectTrigger>
                        <SelectContent>
                          {skills.map((skill) => (
                            <SelectItem
                              key={skill}
                              value={skill}
                              disabled={selectedSkills.includes(skill)}
                            >
                              {skill}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {selectedSkills.map((skill) => (
                          <Badge
                            key={skill}
                            variant="secondary"
                            className="pl-3 pr-1 py-1 text-sm bg-primary/10 border border-primary/20 text-primary"
                          >
                            {skill}
                            <button
                              onClick={() => removeSkill(skill)}
                              type="button"
                              className="ml-2 rounded-full hover:bg-red-500/20 p-0.5"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleTextareaChange}
                        placeholder="Tell me about your project, question, or how I can help..."
                        required
                        rows={6}
                        className="border-primary/20 focus:border-primary/40 transition-colors resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Request"}
                    </Button>

                    {submitStatus === "success" && (
                      <p className="text-center text-green-500">
                        Your message has been sent successfully!
                      </p>
                    )}
                    {submitStatus === "error" && (
                      <p className="text-center text-red-500">
                        Something went wrong. Please try again.
                      </p>
                    )}
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hireme;
