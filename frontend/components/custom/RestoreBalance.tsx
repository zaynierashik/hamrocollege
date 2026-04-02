"use client";

export default function RestoreBalance() {
  return (
    <section className="py-24 bg-[#FDFCFB]">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <div className="lg:pr-12">
            <h2 className="font-display text-5xl lg:text-6xl font-medium tracking-tight text-gray-900 mb-8 leading-[1.1]">
              Embrace <span className="text-outline">Health</span>
            </h2>

            <p className="text-xl text-gray-600 font-light leading-relaxed mb-6">
              I design health where it begins – in the nervous system. New
              scientific insights and training methods continuously flow into my
              work.
            </p>

            <p className="text-xl text-gray-600 font-light leading-relaxed mb-10">
              Natural approaches don't simply mask symptoms; they restore the
              balance of body and mind to achieve not just pain-free living, but
              vibrant health.
            </p>

            <a
              href="#services"
              className="inline-flex items-center text-primary font-medium text-lg hover:text-primary-hover transition-colors gap-2"
            >
              MY SERVICES{" "}
              <iconify-icon
                icon="solar:arrow-right-linear"
                width="20"
                height="20"
              ></iconify-icon>
            </a>
          </div>

          {/* Image */}
          <div className="rounded-[3rem] overflow-hidden aspect-[4/3] lg:aspect-square bg-gray-100 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=1200"
              alt="Balance Nature"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
