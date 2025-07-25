import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, SparklesIcon } from "lucide-react";

const CallToActionSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      <div className="container mx-auto px-4 relative">
        <div className="text-center animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <SparklesIcon className="h-8 w-8 text-white/80 animate-pulse" />
          </div>
          
          <h2 className="font-heading text-3xl md:text-4xl lg:text-6xl font-bold mb-6 text-white tracking-tight">
            Your Global Career
            <br />
            <span className="text-white/90">Starts Here</span>
          </h2>
          
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-10">
            Create your professional resume in minutes and open doors to international opportunities worldwide.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="glass" size="xl" asChild className="group">
              <Link to="/builder" className="flex items-center gap-2">
                Start Building Now
                <ArrowRightIcon className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild className="border-white/30 text-white hover:bg-white/10">
              <Link to="/templates">Browse Templates</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-white/90">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">50,000+</div>
              <div className="text-white/70">Resumes Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-white/70">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">60+</div>
              <div className="text-white/70">Countries Supported</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default CallToActionSection;