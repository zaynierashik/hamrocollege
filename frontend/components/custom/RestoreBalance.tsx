"use client";

export default function RestoreBalance() {
  return (
    <section className="py-24 bg-[#FDFCFB]">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <div className="lg:pr-12">
            <h2 className="font-display text-5xl lg:text-6xl font-medium tracking-tight text-gray-900 mb-8 leading-[1.1]">
              Gönn Dir <span className="text-outline">Gesundheit</span>
            </h2>

            <p className="text-xl text-gray-600 font-light leading-relaxed mb-6">
              Ich gestalte Gesundheit, wo sie beginnt – im Nervensystem. Neue
              wissenschaftliche Erkenntnisse und Trainingsmethoden fließen
              kontinuierlich in meine Arbeit ein.
            </p>

            <p className="text-xl text-gray-600 font-light leading-relaxed mb-10">
              Natürliche Ansätze überdecken nicht einfach Symptome, sie stellen
              das Gleichgewicht von Körper und Geist wieder her, um nicht nur
              Schmerzfreiheit, sondern lebendige Gesundheit zu erreichen.
            </p>

            <a
              href="#angebote"
              className="inline-flex items-center text-primary font-medium text-lg hover:text-primary-hover transition-colors gap-2"
            >
              MEIN ANGEBOT{" "}
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
