"use client";

// import Image from "next/image";

export default function Hero() {
  return (
    <section className="pt-12 pb-24 lg:pt-20 lg:pb-32 relative overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        {/* Hero Top Text */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-10">
          <h1 className="font-display text-6xl sm:text-7xl lg:text-[7.5rem] leading-[0.95] tracking-tight text-gray-900 z-10">
            Did you find your <span className="text-outline">desired</span>
            <br />
            college and course?
          </h1>

          <div className="flex flex-col items-start lg:items-end text-left lg:text-right mb-4">
            <p className="text-xl text-gray-600 font-light mb-8 max-w-[280px]">
              We can help you - easily.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-10 py-4 rounded-full text-white bg-primary hover:bg-primary-hover text-lg font-medium transition-colors shadow-lg shadow-primary/20 whitespace-nowrap"
            >
              GET STARTED
            </a>
          </div>
        </div>

        {/* Hero Image & Cards */}
        <div className="relative w-full max-w-6xl mx-auto mt-10">
          {/* Main Image */}
          <div className="ml-0 lg:ml-24 rounded-[3rem] overflow-hidden relative aspect-[4/3] lg:aspect-[21/10] bg-gray-200 shadow-2xl z-0">
            <img
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1600"
              alt="Yoga Training"
              className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          {/* Floating Card Left */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 lg:left-0 w-[340px] bg-white rounded-[2rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-10 hidden md:block">
            <div className="flex items-center gap-4 mb-5">
              <div className="flex -space-x-3">
                <img
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100"
                  alt="Avatar"
                />
                <img
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100&h=100"
                  alt="Avatar"
                />
                <img
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100&h=100"
                  alt="Avatar"
                />
              </div>
              <span className="text-sm font-medium text-gray-900">
                7000+ Students Helped
              </span>
            </div>

            <h3 className="font-display text-2xl font-medium tracking-tight leading-tight mb-4">
              3+ Years of Experience
            </h3>

            <div className="rounded-2xl overflow-hidden aspect-video mb-4 bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=400"
                alt="Training inside"
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-base text-gray-500 font-light">
              250+ Institutions
            </p>
          </div>

          <div className="absolute bottom-8 right-8 max-w-sm z-10 hidden lg:block">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full px-4 py-2 text-sm font-medium mb-4">
              <iconify-icon
                icon="solar:heart-pulse-linear"
                width="16"
                height="16"
              ></iconify-icon>{" "}
              College Discovery
            </div>
            <p className="text-white/90 text-base font-light leading-relaxed drop-shadow-md">
              Find the perfect college and course that match your goals and
              aspirations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
