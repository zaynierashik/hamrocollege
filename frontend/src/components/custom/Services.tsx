"use client";

export default function Services() {
  const courses = [
    {
      title: "Computer Science",
      category: "Bachelor's",
      image:
        "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Business Administration",
      category: "Bachelor's",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Engineering",
      category: "Master's",
      image:
        "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Management & Finance",
      category: "Master's",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <section id="courses" className="py-24 bg-white scroll-mt-24">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-16 lg:gap-24">
          {/* Left Text */}
          <div className="xl:col-span-4 flex flex-col justify-center">
            <h2 className="font-display text-5xl sm:text-6xl leading-tight tracking-tight mb-6">
              Find
              <br />
              <span className="text-outline">Courses</span>
            </h2>
            <p className="text-xl text-gray-500 font-light leading-relaxed max-w-md">
              Explore world-class bachelor's and master's degree programs
              designed to equip you with the knowledge and skills needed for
              success in Nepal and beyond.
            </p>
          </div>

          {/* Right Grid */}
          <div className="xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {courses.map((course, index) => (
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
                  src={course.image}
                  alt={course.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                <div className="absolute top-6 left-6">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium border border-white/20">
                    {course.category}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 p-8 w-full flex justify-between items-end z-20">
                  <h3 className="font-display text-3xl font-medium text-white tracking-tight leading-none w-2/3">
                    {course.title}
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
