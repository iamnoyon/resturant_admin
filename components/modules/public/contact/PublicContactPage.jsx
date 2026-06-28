"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";

export default function PublicContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Contact form logic
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#042A55] to-[#063C76] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-white/80 text-lg">
              Have a question or need help? We&apos;re here for you. Reach out
              and we&apos;ll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">
              Contact Information
            </h2>

            {[
              {
                icon: Mail,
                label: "Email",
                value: "support@ecommerce.com",
                desc: "We reply within 24 hours",
              },
              {
                icon: Phone,
                label: "Phone",
                value: "+1 (555) 123-4567",
                desc: "Mon-Fri, 9am-6pm EST",
              },
              {
                icon: MapPin,
                label: "Address",
                value: "123 Store Street",
                desc: "City, Country 12345",
              },
              {
                icon: Clock,
                label: "Business Hours",
                value: "Mon - Fri: 9am - 6pm",
                desc: "Weekend: 10am - 4pm",
              },
            ].map((info) => (
              <div key={info.label} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <info.icon size={20} className="text-[#042A55]" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">
                    {info.label}
                  </p>
                  <p className="font-semibold text-gray-900 text-sm">
                    {info.value}
                  </p>
                  <p className="text-xs text-gray-500">{info.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#042A55] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#042A55] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) =>
                      setForm({ ...form, subject: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#042A55] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#042A55] focus:border-transparent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-2 bg-[#042A55] hover:bg-[#063C76] text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                >
                  <Send size={18} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
