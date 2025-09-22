"use client";

import { useState } from "react";
import { FaTicketAlt, FaBug, FaQuestionCircle, FaCog, FaExclamationTriangle, FaPaperPlane, FaCheck } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";

export interface TicketFormData {
  subject: string;
  category: string;
  priority: string;
  description: string;
  serverInfo: {
    serverId?: string;
    serverName?: string;
    userCount?: string;
  };
  contactEmail: string;
  discordUsername: string;
}

const ticketCategories = [
  {
    id: "bug",
    label: "Bug Report",
    icon: <FaBug className="w-4 h-4" />,
    description: "Report a bug or technical issue"
  },
  {
    id: "feature",
    label: "Feature Request",
    icon: <IoSparkles className="w-4 h-4" />,
    description: "Request a new feature or improvement"
  },
  {
    id: "help",
    label: "General Help",
    icon: <FaQuestionCircle className="w-4 h-4" />,
    description: "Get help with commands or setup"
  },
  {
    id: "premium",
    label: "Premium Support",
    icon: <FaCog className="w-4 h-4" />,
    description: "Issues with premium features or billing"
  },
  {
    id: "other",
    label: "Other",
    icon: <FaExclamationTriangle className="w-4 h-4" />,
    description: "Something else not listed above"
  }
];

const priorityLevels = [
  { id: "low", label: "Low", color: "text-green-400", description: "General questions, non-urgent issues" },
  { id: "medium", label: "Medium", color: "text-yellow-400", description: "Bot not working properly" },
  { id: "high", label: "High", color: "text-orange-400", description: "Bot completely down" },
  { id: "urgent", label: "Urgent", color: "text-red-400", description: "Security issues, data loss" }
];

interface TicketSystemProps {
  onSubmit?: (data: TicketFormData) => void;
  className?: string;
}

export default function TicketSystem({ onSubmit, className = "" }: TicketSystemProps) {
  const [formData, setFormData] = useState<TicketFormData>({
    subject: "",
    category: "",
    priority: "medium",
    description: "",
    serverInfo: {
      serverId: "",
      serverName: "",
      userCount: ""
    },
    contactEmail: "",
    discordUsername: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{
    ticketId?: string;
    message?: string;
  } | null>(null);
  const [errors, setErrors] = useState<Partial<TicketFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<TicketFormData> = {};

    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.contactEmail.trim()) newErrors.contactEmail = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit ticket');
      }

      const result = await response.json();
      console.log('Ticket submitted successfully:', result);
      
      // Store the submission result including ticket ID
      setSubmissionResult({
        ticketId: result.ticketId,
        message: result.message
      });
      
      if (onSubmit) {
        onSubmit(formData);
      }
      
      setIsSubmitted(true);
    } catch (error) {
      console.error("Failed to submit ticket:", error);
      // You could show an error message to the user here
      alert("Failed to submit ticket. Please try again or contact support directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: keyof TicketFormData, value: string | TicketFormData["serverInfo"]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const updateServerInfo = (field: keyof TicketFormData["serverInfo"], value: string) => {
    setFormData(prev => ({
      ...prev,
      serverInfo: { ...prev.serverInfo, [field]: value }
    }));
  };

  if (isSubmitted) {
    return (
      <div className={`${className}`}>
        <div className="card p-8 text-center max-w-2xl mx-auto">
          <div className="inline-flex p-4 rounded-full bg-green-500/20 text-green-400 mb-6">
            <FaCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Ticket Submitted Successfully!</h2>
          
          {submissionResult?.ticketId && (
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-blue-400 mb-2">Your Ticket ID</h3>
              <code className="text-xl font-mono bg-blue-500/20 px-4 py-2 rounded border border-blue-500/30 text-blue-300">
                {submissionResult.ticketId}
              </code>
              <p className="text-sm text-blue-300/70 mt-2">
                Save this ID to track your ticket status
              </p>
            </div>
          )}
          
          <p className="text-white/70 mb-6">
            {submissionResult?.message || 
              "We've received your ticket and our support team will get back to you within 24 hours."
            }
            <br />
            You&apos;ll receive updates at <span className="text-primary">{formData.contactEmail}</span>.
          </p>
          
          <div className="bg-white/5 rounded-lg p-4 mb-6 text-left">
            <h4 className="font-semibold mb-3 text-white">Ticket Details:</h4>
            <div className="space-y-2 text-sm text-white/70">
              <p><strong className="text-white">Subject:</strong> {formData.subject}</p>
              <p><strong className="text-white">Category:</strong> {ticketCategories.find(c => c.id === formData.category)?.label}</p>
              <p><strong className="text-white">Priority:</strong> {priorityLevels.find(p => p.id === formData.priority)?.label}</p>
              {submissionResult?.ticketId && (
                <p><strong className="text-white">Ticket ID:</strong> {submissionResult.ticketId}</p>
              )}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={() => {
                setIsSubmitted(false);
                setSubmissionResult(null);
                setFormData({
                  subject: "",
                  category: "",
                  priority: "medium",
                  description: "",
                  serverInfo: { serverId: "", serverName: "", userCount: "" },
                  contactEmail: "",
                  discordUsername: ""
                });
              }}
              className="btn btn-outline"
            >
              Submit Another Ticket
            </button>
            {submissionResult?.ticketId && (
              <a 
                href={`/ticket-status?id=${submissionResult.ticketId}`}
                className="btn btn-primary"
              >
                Track This Ticket
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${className}`}>
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
            <FaTicketAlt className="w-4 h-4" />
            Support Ticket
          </div>
          <h2 className="text-3xl font-bold mb-2">Create a Support Ticket</h2>
          <p className="text-white/70">
            Describe your issue and our support team will help you resolve it quickly.
          </p>
        </div>

        {/* Basic Information */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-white/90 mb-2">
                Subject <span className="text-red-400">*</span>
              </label>
              <input
                id="subject"
                type="text"
                value={formData.subject}
                onChange={(e) => updateFormData("subject", e.target.value)}
                placeholder="Brief description of your issue"
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                  errors.subject ? "border-red-400" : "border-white/10"
                }`}
              />
              {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
            </div>

            <div>
              <label htmlFor="contactEmail" className="block text-sm font-medium text-white/90 mb-2">
                Contact Email <span className="text-red-400">*</span>
              </label>
              <input
                id="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={(e) => updateFormData("contactEmail", e.target.value)}
                placeholder="your@email.com"
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                  errors.contactEmail ? "border-red-400" : "border-white/10"
                }`}
              />
              {errors.contactEmail && <p className="text-red-400 text-sm mt-1">{errors.contactEmail}</p>}
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="discordUsername" className="block text-sm font-medium text-white/90 mb-2">
              Discord Username (Optional)
            </label>
            <input
              id="discordUsername"
              type="text"
              value={formData.discordUsername}
              onChange={(e) => updateFormData("discordUsername", e.target.value)}
              placeholder="username#1234 or @username"
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
        </div>

        {/* Category Selection */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-4">
            Category <span className="text-red-400">*</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {ticketCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => updateFormData("category", category.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  formData.category === category.id
                    ? "border-primary bg-primary/20"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`${formData.category === category.id ? "text-primary" : "text-white/70"}`}>
                    {category.icon}
                  </div>
                  <span className="font-medium">{category.label}</span>
                </div>
                <p className="text-sm text-white/60">{category.description}</p>
              </button>
            ))}
          </div>
          {errors.category && <p className="text-red-400 text-sm mt-2">{errors.category}</p>}
        </div>

        {/* Priority Level */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-4">Priority Level</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {priorityLevels.map((priority) => (
              <button
                key={priority.id}
                type="button"
                onClick={() => updateFormData("priority", priority.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  formData.priority === priority.id
                    ? "border-primary bg-primary/20"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className={`font-medium mb-1 ${priority.color}`}>
                  {priority.label}
                </div>
                <p className="text-sm text-white/60">{priority.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Server Information (Optional) */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-4">Server Information (Optional)</h3>
          <p className="text-white/70 text-sm mb-4">
            If your issue is related to a specific server, providing this information helps us assist you faster.
          </p>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="serverId" className="block text-sm font-medium text-white/90 mb-2">
                Server ID
              </label>
              <input
                id="serverId"
                type="text"
                value={formData.serverInfo.serverId}
                onChange={(e) => updateServerInfo("serverId", e.target.value)}
                placeholder="123456789012345678"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
            <div>
              <label htmlFor="serverName" className="block text-sm font-medium text-white/90 mb-2">
                Server Name
              </label>
              <input
                id="serverName"
                type="text"
                value={formData.serverInfo.serverName}
                onChange={(e) => updateServerInfo("serverName", e.target.value)}
                placeholder="My Discord Server"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
            <div>
              <label htmlFor="userCount" className="block text-sm font-medium text-white/90 mb-2">
                Approximate User Count
              </label>
              <input
                id="userCount"
                type="text"
                value={formData.serverInfo.userCount}
                onChange={(e) => updateServerInfo("userCount", e.target.value)}
                placeholder="100"
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="card p-6">
          <h3 className="text-xl font-semibold mb-4">
            Detailed Description <span className="text-red-400">*</span>
          </h3>
          <textarea
            value={formData.description}
            onChange={(e) => updateFormData("description", e.target.value)}
            placeholder="Please provide as much detail as possible about your issue. Include:&#10;• What you were trying to do&#10;• What happened instead&#10;• Any error messages&#10;• Steps to reproduce the issue"
            rows={8}
            className={`w-full px-4 py-3 rounded-lg bg-white/5 border text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-vertical ${
              errors.description ? "border-red-400" : "border-white/10"
            }`}
          />
          {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary px-8 py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <FaPaperPlane className="w-4 h-4 mr-2" />
                Submit Ticket
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}