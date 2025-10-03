import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PitchModalProps {
  open: boolean;
  onClose: () => void;
}

const slides = [
  {
    title: 'The Problem',
    content: (
      <div className="space-y-4">
        <p className="text-lg">
          Renewable energy producers face a <strong>fragmented discovery process</strong>:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          <li>No way to predict energy potential before investing</li>
          <li>Hard to find qualified engineers for installations</li>
          <li>Supplier discovery is time-consuming and inefficient</li>
          <li>Opportunities slip through the cracks</li>
        </ul>
        <p className="text-lg font-semibold text-primary">
          Result: Slower adoption of renewable energy projects
        </p>
      </div>
    ),
  },
  {
    title: "Today's MVP",
    content: (
      <div className="space-y-4">
        <p className="text-lg font-semibold text-primary">
          Power Connect Circle — Prediction-driven opportunity discovery
        </p>
        <div className="grid gap-4">
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">🎯 For Producers</h4>
            <p className="text-sm">Enter location + energy type → Get AI-powered potential prediction → Instant matches with engineers and suppliers</p>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">🔧 For Engineers</h4>
            <p className="text-sm">Browse predicted opportunities on a map → Filter by skills and location → Express interest in one click</p>
          </div>
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">📦 For Suppliers</h4>
            <p className="text-sm">Appear in matched lists when materials align → Direct contact with producers → Faster sales cycles</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: 'Roadmap & Vision',
    content: (
      <div className="space-y-4">
        <p className="text-lg font-semibold">Phase 1 (Today): <span className="text-primary">Prediction + Matching</span></p>
        <p className="text-lg font-semibold">Phase 2 (Q2): <span className="text-primary">Full Marketplace</span></p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
          <li>Real ML models for energy potential (weather, solar irradiance, terrain)</li>
          <li>Project bidding system for engineers</li>
          <li>Integrated payments and escrow</li>
          <li>Reviews and reputation scoring</li>
        </ul>
        <p className="text-lg font-semibold mt-4">Phase 3: <span className="text-primary">Scale & Ecosystem</span></p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
          <li>Financing and investor matching</li>
          <li>Regulatory guidance and permitting tools</li>
          <li>Community projects and crowdfunding</li>
          <li>API for third-party integrations</li>
        </ul>
        <p className="text-lg font-semibold text-primary mt-6">
          Vision: The end-to-end platform for renewable energy projects
        </p>
      </div>
    ),
  },
];

const PitchModal = ({ open, onClose }: PitchModalProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{slides[currentSlide].title}</DialogTitle>
        </DialogHeader>
        <div className="py-6">
          {slides[currentSlide].content}
        </div>
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex gap-1">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === currentSlide ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            {currentSlide < slides.length - 1 ? (
              <Button size="sm" onClick={nextSlide}>
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            ) : (
              <Button size="sm" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PitchModal;
