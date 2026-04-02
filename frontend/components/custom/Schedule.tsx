"use client";

import { useState, FormEvent } from "react";

export default function Schedule() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    terms: false,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  return (
    <section id="contact" className="py-24 bg-[#FDFCFB]">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-gray-900 leading-[1.1] max-w-2xl">
            Align your schedule with{" "}
            <span className="text-outline">your goals</span>
          </h2>
          <p className="text-xl text-gray-500 font-light max-w-sm lg:text-right">
            Stay connected – for energy and wellness in your daily life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 bg-[#F5F5F0] rounded-[3rem] p-6 lg:p-10">
          {/* Calendar UI Left */}
          <div className="lg:col-span-5 bg-[#1F2937] rounded-[2.5rem] p-8 text-white flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <button
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Previous month"
              >
                <iconify-icon
                  icon="solar:alt-arrow-left-linear"
                  width="20"
                  height="20"
                ></iconify-icon>
              </button>
              <span className="font-display font-medium text-lg tracking-wide">
                September 2026
              </span>
              <button
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Next month"
              >
                <iconify-icon
                  icon="solar:alt-arrow-right-linear"
                  width="20"
                  height="20"
                ></iconify-icon>
              </button>
            </div>

            <div className="grid grid-cols-7 gap-y-6 text-center text-sm font-medium mb-4">
              <div className="text-gray-500">SUN</div>
              <div className="text-gray-500">MON</div>
              <div className="text-gray-500">TUE</div>
              <div className="text-gray-500">WED</div>
              <div className="text-gray-500">THU</div>
              <div className="text-gray-500">FRI</div>
              <div className="text-gray-500">SAT</div>

              {[...Array(31)].map((_, i) => (
                <div key={i} className="py-1 cursor-pointer hover:text-primary">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Form Right */}
          <div className="lg:col-span-7 bg-transparent rounded-[2.5rem] p-2 sm:p-8 flex flex-col justify-center">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Dein Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full bg-white border border-gray-200 rounded-full px-6 py-4 text-base focus:outline-none focus:border-primary transition-colors placeholder:text-gray-400"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="email"
                  placeholder="Email ID"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-white border border-gray-200 rounded-full px-6 py-4 text-base focus:outline-none focus:border-primary transition-colors placeholder:text-gray-400"
                />
                <input
                  type="tel"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full bg-white border border-gray-200 rounded-full px-6 py-4 text-base focus:outline-none focus:border-primary transition-colors placeholder:text-gray-400"
                />
              </div>
              <div>
                <select
                  value={formData.service}
                  onChange={(e) =>
                    setFormData({ ...formData, service: e.target.value })
                  }
                  className="w-full bg-white border border-gray-200 rounded-full px-6 py-4 text-base text-gray-500 focus:outline-none focus:border-primary transition-colors cursor-pointer"
                >
                  <option value="">Was ist dein Anliegen?</option>
                  <option value="1">Schmerzreduktion</option>
                  <option value="2">Performance Coaching</option>
                  <option value="3">Rehabilitation</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="relative flex items-center justify-center w-6 h-6 border border-gray-300 rounded bg-white">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={formData.terms}
                    onChange={(e) =>
                      setFormData({ ...formData, terms: e.target.checked })
                    }
                    className="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <iconify-icon
                    icon="solar:check-linear"
                    className="w-4 h-4 text-white peer-checked:text-primary transition-colors pointer-events-none"
                  ></iconify-icon>
                </div>
                <label
                  htmlFor="terms"
                  className="text-base text-gray-600 font-light cursor-pointer select-none"
                >
                  I agree to the terms and conditions
                </label>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="px-10 py-4 rounded-full text-white bg-primary hover:bg-primary-hover text-base font-medium transition-colors w-full sm:w-auto"
                >
                  JETZT ANFRAGEN
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
