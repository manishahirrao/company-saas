import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: 49,
      period: 'month',
      description: 'Perfect for individuals and small teams getting started',
      features: [
        'Up to 5 team members',
        '10GB storage',
        'Basic analytics',
        'Email support',
        'API access',
        'Basic security'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Professional',
      price: 99,
      period: 'month',
      description: 'For growing teams that need more power',
      features: [
        'Up to 20 team members',
        '100GB storage',
        'Advanced analytics',
        'Priority support',
        'API access',
        'Advanced security',
        'Custom integrations',
        'SSO'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'month',
      description: 'For organizations with custom needs',
      features: [
        'Unlimited team members',
        'Unlimited storage',
        'Advanced analytics',
        '24/7 dedicated support',
        'Custom API limits',
        'Enterprise security',
        'Custom integrations',
        'SSO & SAML',
        'Dedicated account manager'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your team's needs. No hidden fees, cancel anytime.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={plan.name} 
              className={`relative overflow-hidden transition-all duration-200 hover:shadow-lg ${
                plan.popular ? 'border-2 border-primary' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-bl-md">
                  MOST POPULAR
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground">{plan.name}</CardTitle>
                <div className="flex items-baseline mt-2">
                  <span className="text-4xl font-bold text-foreground">
                    {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                  </span>
                  {typeof plan.price === 'number' && (
                    <span className="text-muted-foreground ml-1">/month</span>
                  )}
                </div>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  size="lg" 
                  className={`w-full ${plan.popular ? '' : 'bg-primary/90 hover:bg-primary'}`}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-muted/50 rounded-lg p-6 md:p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Need something custom?</h2>
            <p className="text-muted-foreground mb-6">
              We offer custom plans for large teams and enterprises with specific needs.
              Our team will work with you to create a solution that fits your requirements.
            </p>
            <Button variant="outline" size="lg">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
