import { Prediction } from '@/data/sampleData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap, TrendingUp, MapPin } from 'lucide-react';

interface PredictionCardProps {
  prediction: Prediction;
  onRequestEngineer?: () => void;
  onRequestMaterials?: () => void;
  showActions?: boolean;
}

const PredictionCard = ({ 
  prediction, 
  onRequestEngineer, 
  onRequestMaterials,
  showActions = true 
}: PredictionCardProps) => {
  const confidenceColors = {
    High: 'bg-primary text-primary-foreground',
    Medium: 'bg-accent text-accent-foreground',
    Low: 'bg-muted text-muted-foreground',
  };

  const energyIcons = {
    solar: '☀️',
    wind: '🌬️',
    hydro: '💧',
    geothermal: '🌋',
  };

  return (
    <Card className="animate-fade-in shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{energyIcons[prediction.energyType]}</span>
            <div>
              <CardTitle className="text-xl capitalize">{prediction.energyType} Energy</CardTitle>
              <CardDescription className="flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3" />
                {prediction.location}
              </CardDescription>
            </div>
          </div>
          <Badge className={confidenceColors[prediction.confidence]}>
            {prediction.confidence}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{prediction.description}</p>
        
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Predicted Potential</span>
          </div>
          <p className="text-3xl font-bold text-primary">{prediction.predictedKW} kW</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium">Growth Trend</span>
          </div>
          <div className="flex items-end gap-1 h-16">
            {prediction.sampleSparkline.map((value, i) => (
              <div
                key={i}
                className="flex-1 bg-primary/20 hover:bg-primary/40 transition-colors rounded-t"
                style={{ height: `${(value / Math.max(...prediction.sampleSparkline)) * 100}%` }}
                title={`${value} kW`}
              />
            ))}
          </div>
        </div>

        {showActions && (
          <div className="flex gap-2 pt-2">
            <Button 
              onClick={onRequestEngineer} 
              className="flex-1"
              variant="default"
            >
              Find Engineer
            </Button>
            <Button 
              onClick={onRequestMaterials} 
              className="flex-1"
              variant="outline"
            >
              Get Materials
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PredictionCard;
