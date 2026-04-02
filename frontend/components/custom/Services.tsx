"use client";

export default function Services() {
  const services = [
    {
      title: "Neuro Athletik",
      category: "Holistic Wellness",
      image:
        "https://images.unsplash.com/photo-1599447421416-3414500d18a5?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Schmerzreduktion",
      category: "Kinesiology",
      image:
        "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Performance Coaching",
      category: "Holistic GP",
      image:
        "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Rehabilitation",
      category: "Remedial Massage",
      image:
        "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 lg:gap-24">
          {/* Left Text */}
          <div className="xl:col-span-4 flex flex-col justify-center">
            <h2 className="font-display text-5xl sm:text-6xl leading-tight tracking-tight mb-6">
              <span className="text-outline">Mein</span>
              <br />
              Angebot
            </h2>
            <p className="text-xl text-gray-500 font-light leading-relaxed max-w-md">
              Das Training bindet visuelle, vestibuläre und propriozeptive
              Reizverarbeitung ein, um die Ursache anzugehen, nicht nur das
              Symptom.
            </p>
          </div>

          {/* Right Grid */}
          <div className="xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group relative rounded-[2.5rem] overflow-hidden aspect-square sm:aspect-[4/5] bg-gray-100 cursor-pointer ${
                  index === 1 || index === 3
                    ? index === 1
                      ? "md:mt-16"
                      : "md:mt-8"
                    : index === 2
                      ? "-mt-4 md:-mt-8"
                      : ""
                }`}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                <div className="absolute top-6 left-6">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium border border-white/20">
                    {service.category}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end z-20">
                  <h3 className="font-display text-3xl font-medium text-white tracking-tight leading-none w-2/3">
                    {service.title}
                  </h3>
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shadow-lg">
                    <iconify-icon
                      icon="solar:arrow-right-up-linear"
                      width="24"
                      height="24"
                    ></iconify-icon>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
