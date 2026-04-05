"use client";

import { useRef } from "react";

export default function Experts() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const colleges = [
    {
      name: "Kathford Int'l College of Engineering and Management",
      affiliation: "Tribhuvan University",
      tag: "Engineering",
      programs: "30+ Programs",
      image:
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=900",
    },
    {
      name: "The Westminster College",
      affiliation: "The Westminster College, UK",
      tag: "Business",
      programs: "20+ Programs",
      image:
        "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&q=80&w=900",
    },
    {
      name: "Kathmandu Engineering College",
      affiliation: "Tribhuvan University",
      tag: "Technology",
      programs: "25+ Programs",
      image:
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=900",
    },
    {
      name: "Islington College",
      affiliation: "London Metropolitan University",
      tag: "IT & Management",
      programs: "18+ Programs",
      image:
        "https://images.unsplash.com/photo-1479839672679-a46483c0e7c8?auto=format&fit=crop&q=80&w=900",
    },
  ];

  const scrollByAmount = (direction: "left" | "right") => {
    if (!sliderRef.current) return;

    const container = sliderRef.current;
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    const amount = Math.round(sliderRef.current.clientWidth * 0.55);
    const start = container.scrollLeft;
    const target = start + (direction === "left" ? -amount : amount);
    const duration = 1800;
    const startTime = performance.now();

    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);

      container.scrollLeft = start + (target - start) * eased;

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        animationFrameRef.current = null;
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  return (
    <section id="colleges" className="py-24 bg-white scroll-mt-24">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex items-end justify-between gap-6 mb-7">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-3">
              Featured Campuses
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-tight text-gray-900 leading-[1.05]">
              Explore Top
              <span className="text-outline"> Colleges</span>
            </h2>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mb-5">
          <button
            type="button"
            onClick={() => scrollByAmount("left")}
            aria-label="Scroll colleges left"
            className="w-11 h-11 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            <iconify-icon
              icon="solar:alt-arrow-left-linear"
              width="20"
              height="20"
            ></iconify-icon>
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount("right")}
            aria-label="Scroll colleges right"
            className="w-11 h-11 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            <iconify-icon
              icon="solar:alt-arrow-right-linear"
              width="20"
              height="20"
            ></iconify-icon>
          </button>
        </div>

        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {colleges.map((college) => (
            <div
              key={college.name}
              className="flex-none w-[86vw] sm:w-[62vw] lg:w-[30rem] rounded-[2.5rem] overflow-hidden h-[420px] sm:h-[460px] bg-gray-100 relative group border border-gray-200"
            >
              <img
                src={college.image}
                alt={college.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

              <div className="absolute top-5 left-5 right-5 z-10 flex items-center justify-between">
                <span className="inline-flex px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium border border-white/30">
                  {college.tag}
                </span>
                <span className="inline-flex px-3 py-1 rounded-full bg-black/25 backdrop-blur-md text-white text-xs font-medium border border-white/20">
                  {college.programs}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end gap-4 z-10">
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-2xl font-medium tracking-tight text-white mb-1 truncate">
                    {college.name}
                  </h3>
                  <p className="text-white/80 font-light text-base">
                    {college.affiliation}
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
          ))}

          <div className="flex-none w-[86vw] sm:w-[62vw] lg:w-[30rem] rounded-[2.5rem] overflow-hidden h-[420px] sm:h-[460px] relative bg-gradient-to-br from-[#e79916] via-[#d7880f] to-[#1f2937] p-8 sm:p-10 flex flex-col justify-between border border-white/20">
            <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
            <div className="absolute bottom-0 left-0 w-28 h-28 bg-black/10 rounded-full translate-y-10 -translate-x-8"></div>

            <div className="relative z-10">
              <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-medium w-max mb-6 backdrop-blur-sm border border-white/25">
                Colleges Data
              </div>
              <h3 className="font-display text-3xl lg:text-4xl font-medium tracking-tight text-white leading-tight mb-4">
                Nepal College Snapshot
              </h3>
              <ul className="text-white/95 text-base font-light leading-relaxed mb-6 space-y-2">
                <li>250+ institutions listed across Nepal</li>
                <li>100+ academic programs compared</li>
                <li>Regularly updated details and facilities</li>
              </ul>
            </div>

            <div className="relative z-10">
              <a
                href="#colleges"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-white text-primary hover:bg-gray-100 text-sm font-semibold transition-colors w-max"
              >
                EXPLORE COLLEGES
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
