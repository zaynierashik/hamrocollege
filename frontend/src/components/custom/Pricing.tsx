"use client";

export default function Pricing() {
  const pricingPlans = [
    {
      type: "Starter",
      title: "Initial Consultation",
      price: "Free",
      features: [
        "30 Min. Introductory Session",
        "Situation Analysis",
        "Personalized Initial Recommendation",
      ],
    },
    {
      type: "Premium",
      title: "Premium Coaching",
      price: "Upon Request",
      features: [
        "Neuro-Centered 1:1 Training",
        "Pain Analysis & Diagnostics",
        "Visual & Vestibular Integration",
        "Remote & In-Person Berlin",
      ],
      isPremium: true,
    },
  ];

  return (
    <section className="py-24 bg-[#FDFCFB]">
      <div className="max-w-[90rem] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl font-medium tracking-tight text-gray-900">
            Your Entry Into{" "}
            <span className="text-outline">Neuro-Centered Training</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-[3rem] p-10 lg:p-14 flex flex-col justify-between ${
                plan.isPremium
                  ? "bg-primary shadow-lg text-white relative overflow-hidden"
                  : "bg-white border border-gray-200 shadow-sm"
              }`}
            >
              {plan.isPremium && (
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=800')] opacity-10 mix-blend-overlay object-cover w-full h-full"></div>
              )}

              <div className={plan.isPremium ? "relative z-10" : ""}>
                <div
                  className={`inline-block px-4 py-1.5 rounded-full ${
                    plan.isPremium
                      ? "bg-white/20 backdrop-blur-sm text-white"
                      : "bg-primary/10 text-primary"
                  } text-xs font-medium mb-6`}
                >
                  {plan.type}
                </div>
                <h3
                  className={`font-display text-3xl font-medium tracking-tight ${
                    plan.isPremium ? "text-white" : "text-gray-900"
                  } mb-2`}
                >
                  {plan.title}
                </h3>
                <div
                  className={`text-4xl font-medium mb-8 ${
                    plan.isPremium ? "text-white" : "text-gray-900"
                  }`}
                >
                  {plan.price}
                </div>

                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border ${
                          plan.isPremium ? "border-white/50" : "border-gray-300"
                        } flex items-center justify-center flex-shrink-0`}
                      >
                        <iconify-icon
                          icon="solar:check-linear"
                          className={`w-3 h-3 ${
                            plan.isPremium ? "text-white" : "text-gray-600"
                          }`}
                        ></iconify-icon>
                      </div>
                      <span
                        className={`${
                          plan.isPremium ? "text-white/90" : "text-gray-600"
                        } text-lg font-light`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href="#kontakt"
                className={`block w-full text-center px-8 py-4 rounded-full font-medium hover:transition-colors ${
                  plan.isPremium
                    ? "bg-white text-primary hover:bg-gray-50 relative z-10"
                    : "bg-primary text-white hover:bg-primary-hover"
                }`}
              >
                {plan.isPremium ? "ANFRAGEN" : "JETZT BUCHEN"}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
