"use client";

export default function CTA() {
  return (
    <section className="py-24 bg-[#1F2937]">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="max-w-2xl text-center md:text-left">
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white mb-6 leading-tight">
            Find Your Balance.
            <br />
            <span className="text-outline-dark">Start Your Journey Now.</span>
          </h2>
          <p className="text-xl text-gray-400 font-light leading-relaxed">
            Luise Walther helps you rethink health — from the nervous system.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-white bg-primary hover:bg-primary-hover text-base font-medium transition-colors"
          >
            REQUEST NOW
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full text-white border border-gray-600 hover:border-white text-base font-medium transition-colors"
          >
            BOOK APPOINTMENT
          </a>
        </div>
      </div>
    </section>
  );
}
