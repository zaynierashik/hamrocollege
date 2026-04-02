"use client";

export default function Blog() {
  const posts = [
    {
      title:
        "Gesunde Leistungsfähigkeit ohne Ausbrennen: Pausen, Sabbatical & Kälte mit Nina Kuhlmann",
      description:
        "Stress, Wellbeing, Depression, Sleep, Mindfulness, and Healing.",
      image:
        "https://images.unsplash.com/photo-1522845015757-50bce044e5da?auto=format&fit=crop&q=80&w=600",
    },
    {
      title:
        "Gesundheit als Identität: Soziale Fitness, Selbstreflexion & weniger Hype mit Dr. Anne Latz",
      description:
        "Insomnia, Depression, Stress, Anxiety, and Emotional Balance.",
      image:
        "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=600",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-gray-900">
            Gönn Dir Gesundheit —{" "}
            <span className="text-outline">Tipps & Updates</span>
          </h2>
        </div>

        <div className="space-y-6">
          {posts.map((post, index) => (
            <div
              key={index}
              className="group flex flex-col md:flex-row bg-white border border-gray-100 rounded-[3rem] p-3 gap-6 items-center hover:shadow-[0_10px_40px_rgba(0,0,0,0.05)] transition-all duration-300 cursor-pointer"
            >
              <div className="w-full md:w-80 h-48 md:h-36 rounded-[2rem] overflow-hidden flex-shrink-0">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="flex-grow flex justify-between items-center px-4 w-full">
                <div className="max-w-xl">
                  <h3 className="font-display text-2xl font-medium tracking-tight text-gray-900 mb-2 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-base text-gray-500 font-light line-clamp-1">
                    {post.description}
                  </p>
                </div>
                <div className="hidden md:flex w-12 h-12 rounded-full bg-primary text-white items-center justify-center flex-shrink-0 ml-4 group-hover:-rotate-45 transition-transform">
                  <iconify-icon
                    icon="solar:arrow-right-linear"
                    width="20"
                    height="20"
                  ></iconify-icon>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
