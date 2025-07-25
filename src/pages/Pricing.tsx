import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { CheckIcon, XIcon, StarIcon } from "lucide-react";

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  
  const plans = [
    {
      name: "Free",
      description: "Perfect for getting started",
      price: { monthly: 0, annual: 0 },
      badge: null,
      features: [
        { name: "1 resume template", included: true },
        { name: "Basic country formats", included: true },
        { name: "PDF download", included: true },
        { name: "ATS optimization", included: true },
        { name: "Real-time preview", included: true },
        { name: "Multiple templates", included: false },
        { name: "Premium support", included: false },
        { name: "Cover letter builder", included: false },
        { name: "Advanced customization", included: false },
        { name: "Priority processing", included: false }
      ],
      buttonText: "Get Started Free",
      buttonVariant: "outline" as const,
      popular: false
    },
    {
      name: "Professional",
      description: "For serious job seekers",
      price: { monthly: 9.99, annual: 7.99 },
      badge: "Most Popular",
      features: [
        { name: "All free features", included: true },
        { name: "10+ premium templates", included: true },
        { name: "All country formats", included: true },
        { name: "Cover letter builder", included: true },
        { name: "Advanced customization", included: true },
        { name: "Email support", included: true },
        { name: "Multiple resume versions", included: true },
        { name: "LinkedIn optimization", included: true },
        { name: "Keyword suggestions", included: false },
        { name: "Priority processing", included: false }
      ],
      buttonText: "Start Professional",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      name: "Premium",
      description: "For career professionals",
      price: { monthly: 19.99, annual: 15.99 },
      badge: "Best Value",
      features: [
        { name: "All Professional features", included: true },
        { name: "20+ premium templates", included: true },
        { name: "AI-powered suggestions", included: true },
        { name: "Keyword optimization", included: true },
        { name: "Priority support", included: true },
        { name: "Resume review service", included: true },
        { name: "Career coaching calls", included: true },
        { name: "LinkedIn profile optimization", included: true },
        { name: "Job match recommendations", included: true },
        { name: "Priority processing", included: true }
      ],
      buttonText: "Go Premium",
      buttonVariant: "default" as const,
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Start free and upgrade when you're ready to unlock the full power of professional resume building
          </p>

          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${!isAnnual ? 'font-semibold' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <span className={`text-sm ${isAnnual ? 'font-semibold' : 'text-muted-foreground'}`}>
              Annual
            </span>
            <Badge variant="secondary" className="ml-2">Save 20%</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
              {plan.badge && (
                <Badge 
                  className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${
                    plan.popular ? 'bg-primary' : 'bg-secondary'
                  }`}
                >
                  {plan.badge}
                </Badge>
              )}

              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    ${isAnnual ? plan.price.annual : plan.price.monthly}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className="text-muted-foreground">
                      /{isAnnual ? 'month' : 'month'}
                    </span>
                  )}
                  {isAnnual && plan.price.monthly > 0 && (
                    <div className="text-sm text-muted-foreground">
                      Billed annually (${plan.price.annual * 12}/year)
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <Button 
                  className="w-full mb-6" 
                  variant={plan.buttonVariant}
                  size="lg"
                >
                  {plan.buttonText}
                </Button>

                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      {feature.included ? (
                        <CheckIcon className="h-4 w-4 text-green-500 flex-shrink-0" />
                      ) : (
                        <XIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      )}
                      <span className={`text-sm ${feature.included ? '' : 'text-muted-foreground'}`}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I cancel anytime?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! You can cancel your subscription at any time. You'll continue to have access to premium features until the end of your billing period.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Do you offer refunds?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We offer a 30-day money-back guarantee. If you're not satisfied with our service, contact us for a full refund.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Can I change plans later?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Absolutely! You can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What payment methods do you accept?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We accept all major credit cards (Visa, Mastercard, American Express) and PayPal for your convenience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <StarIcon className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Ready to Build Your Professional Resume?</CardTitle>
              <CardDescription className="text-lg">
                Join thousands of professionals who have successfully landed their dream jobs with our resume builder
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button size="lg" className="mr-4">
                Start Building Now
              </Button>
              <Button variant="outline" size="lg">
                View All Templates
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Pricing;