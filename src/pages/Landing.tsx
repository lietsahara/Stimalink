import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Zap, Map, Users, TrendingUp, Github, Presentation } from 'lucide-react';
import PitchModal from '@/components/PitchModal';

interface LandingProps {
  onStartDemo: () => void;
}

const Landing = ({ onStartDemo }: LandingProps) => {
  const [pitchOpen, setPitchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 animate-fade-in">
            <div className="inline-block">
              <div className="flex items-center gap-3 bg-primary/10 px-6 py-3 rounded-full">
                <Zap className="w-6 h-6 text-primary" />
                <span className="font-semibold text-primary">Power Connect Circle</span>
              </div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              Turn energy potential
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                into real projects
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Find engineers and suppliers to make it real — powered by AI-driven predictions
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                onClick={onStartDemo}
                className="text-lg px-8 py-6 shadow-[var(--shadow-strong)] hover:scale-105 transition-transform"
              >
                <Zap className="w-5 h-5 mr-2" />
                Start Demo
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setPitchOpen(true)}
                className="text-lg px-8 py-6"
              >
                <Presentation className="w-5 h-5 mr-2" />
                View Pitch
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-foreground transition-colors"
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              Three simple steps to connect renewable energy stakeholders
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-all animate-fade-in">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Map className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Predict Potential</h3>
              <p className="text-muted-foreground">
                Enter your location and energy type. Our AI predicts the energy potential with confidence scores and growth trends.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-all animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Get Matched</h3>
              <p className="text-muted-foreground">
                Instantly see engineers and suppliers matched to your project based on skills, materials, and location.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-all animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Connect & Build</h3>
              <p className="text-muted-foreground">
                Express interest, request quotes, and turn predictions into real renewable energy projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Future Vision Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">The Future Marketplace</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              This MVP is just Phase 1. Our roadmap includes full ML predictions, a P2P marketplace for sellers to offer excess energy to buyers in local mini-grids, bidding systems, integrated payments, financing tools, and regulatory guidance, building a complete platform for renewable energy projects.
            </p>
            <Button
              size="lg"
              onClick={onStartDemo}
              className="shadow-[var(--shadow-strong)]"
            >
              Try the MVP Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground">
           Power Connect Circle © 2025
          </p>
        </div>
      </footer>

      <PitchModal open={pitchOpen} onClose={() => setPitchOpen(false)} />
    </div>
  );
};

export default Landing;
