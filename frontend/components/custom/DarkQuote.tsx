"use client";

export default function DarkQuote() {
  return (
    <section className="relative py-32 lg:py-48 bg-[#111827] overflow-hidden">
      {/* Background Image Silhouette */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
        <img
          src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=2000"
          alt="Silhouette"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111827] via-[#111827]/80 to-transparent"></div>
      </div>

      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10">
        <div className="max-w-3xl">
          <h2 className="font-display text-5xl md:text-7xl font-medium text-white tracking-tight leading-[1.1] mb-8">
            Bewegung ist der Weg,
            <br />
            <span className="text-outline">
              wie dein Körper sich regeneriert.
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed max-w-2xl">
            Neurozentriertes Training setzt dort an, wo Leistung wirklich
            entsteht – im Gehirn.
          </p>
        </div>
      </div>
    </section>
  );
}
