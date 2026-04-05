export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-[#FDFCFB] scroll-mt-24">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mb-12 lg:mb-16">
          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-4 py-1.5 text-sm font-medium mb-5">
            Our Story
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-gray-900 mb-6 leading-[1.05]">
            Built by Students,
            <br />
            <span className="text-outline">Trusted Across Nepal</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 font-light leading-relaxed max-w-3xl [text-align:justify]">
            Hamrocollege helps students and families discover colleges, compare
            options, and make informed higher education decisions with clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-7">
            <article className="mb-12">
              <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4">
                How we started
              </p>
              <h3 className="font-display text-3xl sm:text-4xl text-gray-900 tracking-tight mb-5 leading-tight">
                A student-led idea in 2024, now a leading education portal
              </h3>
              <div className="space-y-4 text-lg text-gray-600 font-light leading-relaxed max-w-3xl [text-align:justify]">
                <p>
                  Hamrocollege began in 2024 A.D. with one goal: help Nepali
                  students make informed decisions about higher education.
                </p>
                <p>
                  As trust and feedback grew, the platform became a go-to place
                  to search colleges, compare programs, and evaluate facilities
                  quickly.
                </p>
                <p>
                  Our work has also earned international recognition, including
                  the 'World Summit Youth Award' in the "Education for All"
                  category.
                </p>
              </div>
            </article>

            <article>
              <p className="text-sm uppercase tracking-[0.2em] text-primary font-medium mb-4">
                Core Mission
              </p>
              <h3 className="font-display text-3xl sm:text-4xl text-gray-900 tracking-tight mb-5 leading-tight">
                Our Approach
              </h3>
              <div className="space-y-4 text-lg text-gray-600 font-light leading-relaxed max-w-3xl [text-align:justify]">
                <p>
                  Since day one, Hamrocollege has focused on providing
                  comprehensive, accurate, timely, and unbiased information on
                  courses, colleges, scholarships, careers, and education news.
                </p>
                <p>
                  We also collaborate with institutions and organizations to
                  promote education through campaigns and events across Nepal.
                </p>
              </div>
            </article>
          </div>

          <aside className="lg:col-span-5 lg:pl-8 lg:border-l lg:border-gray-200">
            <blockquote className="font-display text-2xl sm:text-3xl text-gray-900 tracking-tight leading-tight mb-10">
              "From first search to final enrollment, Hamrocollege helps
              students move from confusion to clarity."
            </blockquote>

            <div className="space-y-8">
              <div>
                <p className="font-display text-5xl text-primary leading-none">
                  2024
                </p>
                <p className="text-gray-500 mt-2">Founded by students</p>
              </div>
              <div>
                <p className="font-display text-5xl text-primary leading-none">
                  Nepal
                </p>
                <p className="text-gray-500 mt-2">
                  Serving learners nationwide
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
