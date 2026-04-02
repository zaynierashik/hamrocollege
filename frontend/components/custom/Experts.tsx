"use client";

export default function Experts() {
  return (
    <section className="py-24 bg-[#F5F5F0]">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Person 1 */}
          <div className="rounded-[2.5rem] overflow-hidden aspect-[4/5] bg-gray-100 relative group">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600"
              alt="Luise Coach"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end gap-4 z-10">
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-2xl font-medium tracking-tight text-white mb-1 truncate">
                  Kathford Int'l College of Engineering and Management
                </h3>
                <p className="text-white/80 font-light text-base">
                  Tribhuvan University
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:scale-110 transition-transform cursor-pointer flex-shrink-0">
                <iconify-icon
                  icon="solar:arrow-right-up-linear"
                  width="20"
                  height="20"
                ></iconify-icon>
              </div>
            </div>
          </div>

          {/* Person 2 */}
          <div className="rounded-[2.5rem] overflow-hidden aspect-[4/5] bg-gray-100 relative group">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600"
              alt="Luise Speaker"
              className="w-full h-full object-cover filter grayscale-[20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end gap-4 z-10">
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-2xl font-medium tracking-tight text-white mb-1 truncate">
                  The Westminster College
                </h3>
                <p className="text-white/80 font-light text-base">
                  The Westminster College, UK
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center hover:scale-110 transition-transform cursor-pointer flex-shrink-0">
                <iconify-icon
                  icon="solar:arrow-right-up-linear"
                  width="20"
                  height="20"
                ></iconify-icon>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="rounded-[2.5rem] overflow-hidden aspect-[4/5] lg:aspect-square bg-gray-100 relative">
            <img
              src="https://images.unsplash.com/photo-1594381898348-846ce32e7b37?auto=format&fit=crop&q=80&w=600"
              alt="Specialist"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent"></div>
            <div className="absolute inset-0 p-10 flex flex-col justify-end z-10">
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-medium w-max mb-6">
                Expertise
              </div>
              <h3 className="font-display text-3xl lg:text-4xl font-medium tracking-tight text-white leading-tight mb-4">
                Meet the Specialist
              </h3>
              <p className="text-white/90 text-base font-light leading-relaxed mb-6">
                Our experienced trainers bring deep knowledge, passion, and
                expertise to accompany you optimally on your journey.
              </p>
              <a
                href="#about"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-white text-white hover:bg-white hover:text-primary text-sm font-medium transition-colors w-max"
              >
                MEET THE SPECIALIST
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
