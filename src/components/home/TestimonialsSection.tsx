import React from "react";
import { StarIcon, QuoteIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "Microsoft Canada",
      country: "🇨🇦",
      image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1021&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      content: "GlobeCraft helped me land my dream job at Microsoft! The Canadian template was exactly what I needed, and the ATS optimization worked perfectly.",
      rating: 5
    },
    {
      name: "Marcus Weber",
      role: "Data Scientist",
      company: "SAP Germany",
      country: "🇩🇪",
      image: "https://images.unsplash.com/photo-1615109398623-88346a601842?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      content: "The German Lebenslauf format was spot-on. I received 3 job offers within 2 weeks of applying with my new resume.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Manager",
      company: "Atlassian Australia",
      country: "🇦🇺",
      image: "https://media.istockphoto.com/id/936335126/photo/smiling-businessman.jpg?s=612x612&w=0&k=20&c=yUElz9EgDsIWs18J_tfA6ac2_zgmoQJPTD5hp03kzrg=",
      content: "The STAR method formatting helped me showcase my achievements perfectly. Highly recommend for anyone applying to Australian companies!",
      rating: 5
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight">
            Trusted by Professionals Worldwide
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            See how our international resume templates have helped thousands of professionals land their dream jobs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="group relative animate-scale-in card-premium hover:border-primary/20 overflow-hidden"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              <CardContent className="p-6 lg:p-8">
                <div className="flex items-center mb-4">
                  <QuoteIcon className="h-8 w-8 text-primary/20 mb-4" />
                </div>
                
                <blockquote className="text-muted-foreground leading-relaxed mb-6">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover shadow-md"
                      loading="lazy"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                        <span className="text-lg">{testimonial.country}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-sm font-medium text-primary">{testimonial.company}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mt-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <StarIcon key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="bg-gradient-secondary rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="h-5 w-5 fill-warning text-warning" />
                ))}
              </div>
              <span className="text-2xl font-bold text-foreground">4.9/5</span>
            </div>
            <h3 className="font-heading text-2xl md:text-3xl font-bold mb-4">
              Join 50,000+ Professionals
            </h3>
            <p className="text-muted-foreground text-lg mb-8">
              Who have successfully created their international resumes with GlobeCraft
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>95% Success Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>60+ Countries Supported</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;