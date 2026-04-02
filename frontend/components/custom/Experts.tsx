"use client";

export default function Experts() {
  return (
    <section className="py-24 bg-[#F5F5F0]">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Person 1 */}
          <div className="bg-[#EBEBE6] rounded-[2.5rem] p-4 flex flex-col group relative">
            <div className="rounded-[2rem] overflow-hidden aspect-[4/5] mb-6 relative">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
                alt="Luise Coach"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="px-4 pb-4 flex justify-between items-end relative z-10 bg-white -mt-16 mx-4 pt-6 rounded-3xl shadow-sm">
              <div>
                <h3 className="font-display text-2xl font-medium tracking-tight text-gray-900 mb-1">
                  Luise Walther
                </h3>
                <p className="text-gray-500 font-light text-base">
                  Performance Coach
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                <iconify-icon
                  icon="solar:arrow-right-up-linear"
                  width="20"
                  height="20"
                ></iconify-icon>
              </div>
            </div>
          </div>

          {/* Person 2 */}
          <div className="bg-[#EBEBE6] rounded-[2.5rem] p-4 flex flex-col group relative">
            <div className="rounded-[2rem] overflow-hidden aspect-[4/5] mb-6 relative">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600"
                alt="Luise Speaker"
                className="w-full h-full object-cover filter grayscale-[20%]"
              />
            </div>
            <div className="px-4 pb-4 flex justify-between items-end relative z-10 bg-white -mt-16 mx-4 pt-6 rounded-3xl shadow-sm">
              <div>
                <h3 className="font-display text-2xl font-medium tracking-tight text-gray-900 mb-1">
                  Luise Walther
                </h3>
                <p className="text-gray-500 font-light text-base">
                  Speakerin & Autorin
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                <iconify-icon
                  icon="solar:arrow-right-up-linear"
                  width="20"
                  height="20"
                ></iconify-icon>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="bg-primary rounded-[2.5rem] p-10 flex flex-col justify-center">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-medium w-max mb-6">
              Expertise
            </div>
            <h3 className="font-display text-4xl lg:text-5xl font-medium tracking-tight text-white leading-tight mb-6">
              Meet the Specialist
            </h3>
            <p className="text-white/90 text-lg font-light leading-relaxed mb-10">
              Unsere erfahrenen Trainer bringen fundiertes Wissen, Leidenschaft
              und Erfahrung mit, um dich auf deiner Reise optimal zu begleiten.
            </p>
            <a
              href="#about"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white text-white hover:bg-white hover:text-primary text-base font-medium transition-colors w-max"
            >
              MEET THE SPECIALIST
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
