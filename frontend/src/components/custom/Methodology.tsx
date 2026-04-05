"use client";

export default function Methodology() {
  const features = [
    "Visual Stimulus Processing",
    "Vestibular & Proprioceptive System",
    "Close Collaboration with Doctors & Therapists Berlin",
  ];

  return (
    <section className="py-24 lg:py-32 bg-[#FDFCFB]">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <div className="rounded-[3rem] overflow-hidden aspect-square lg:aspect-[4/5] shadow-sm bg-gray-100">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200"
              alt="Luise Method"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="lg:pr-12">
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-gray-900 mb-8 leading-[1.1]">
              Better Results{" "}
              <span className="text-outline">With No Side Effects</span>
            </h2>

            <p className="text-xl text-gray-600 font-light leading-relaxed mb-10">
              My approach is a precise rehabilitation and training system based
              on neural processes. Focused on pain reduction and improving
              movement patterns, quality of life is enhanced.
            </p>

            <p className="text-xl text-gray-600 font-light leading-relaxed mb-10">
              Natural treatment approaches focus individually on addressing your
              unique needs. This includes neural balance, effective stress
              management, and pain relief.
            </p>

            <ul className="space-y-6">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0 text-primary">
                    <iconify-icon
                      icon="solar:check-circle-linear"
                      width="24"
                      height="24"
                    ></iconify-icon>
                  </div>
                  <span className="text-lg text-gray-800 font-medium">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
