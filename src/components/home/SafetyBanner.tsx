import { Shield, MapPin, Heart, Ban } from "lucide-react";

const SafetyBanner = () => {
  const features = [
    {
      icon: Shield,
      title: "ID Verified",
      description: "All Saathis verified with Govt ID",
    },
    {
      icon: MapPin,
      title: "Public Meetups Only",
      description: "Meet at cafes, parks & public spaces",
    },
    {
      icon: Ban,
      title: "No Dating",
      description: "Strictly platonic connections",
    },
    {
      icon: Heart,
      title: "Respectful Community",
      description: "Zero tolerance for harassment",
    },
  ];

  return (
    <section className="py-8 bg-secondary">
      <div className="container mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 text-secondary-foreground"
            >
              <feature.icon className="w-5 h-5" />
              <div>
                <p className="font-semibold text-sm">{feature.title}</p>
                <p className="text-xs opacity-80">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SafetyBanner;
