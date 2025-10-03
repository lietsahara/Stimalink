import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useApp } from '@/contexts/AppContext';
import { mockApi } from '@/api/mockApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MapView from '@/components/MapView';
import PredictionCard from '@/components/PredictionCard';
import MatchList from '@/components/MatchList';
import { Engineer, Supplier } from '@/data/sampleData';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface ProducerFormData {
  location: string;
  energyType: 'solar' | 'wind' | 'hydro' | 'geothermal';
  capacity?: number;
  description?: string;
}

const Producer = () => {
  const { currentPrediction, setCurrentPrediction, addOpportunity } = useApp();
  const [loading, setLoading] = useState(false);
  const [matchedEngineers, setMatchedEngineers] = useState<Engineer[]>([]);
  const [matchedSuppliers, setMatchedSuppliers] = useState<Supplier[]>([]);
  const [showMatches, setShowMatches] = useState(false);
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ProducerFormData>({
    defaultValues: {
      energyType: 'solar',
    },
  });

  const energyType = watch('energyType');

  // Sample coordinates for common cities (simplified)
  const cityCoords: Record<string, [number, number]> = {
    'new york': [40.7128, -74.006],
    'los angeles': [34.0522, -118.2437],
    'chicago': [41.8781, -87.6298],
    'san francisco': [37.7749, -122.4194],
    'denver': [39.7392, -104.9903],
    'seattle': [47.6062, -122.3321],
  };

  const onSubmit = async (data: ProducerFormData) => {
    setLoading(true);
    setShowMatches(false);
    
    try {
      // Get coordinates (simplified - in real app would use geocoding API)
      const cityKey = data.location.toLowerCase();
      const coords = cityCoords[cityKey] || [39.8283, -98.5795]; // Default to center US
      
      const prediction = await mockApi.getPrediction({
        lat: coords[0],
        lng: coords[1],
        energyType: data.energyType,
        capacity: data.capacity,
        description: data.description,
        location: data.location,
      });
      
      setCurrentPrediction(prediction);
      addOpportunity(prediction);
      
      toast.success('Prediction generated successfully!', {
        description: `Predicted potential: ${prediction.predictedKW} kW`,
      });
    } catch (error) {
      toast.error('Failed to generate prediction');
    } finally {
      setLoading(false);
    }
  };

  const handleFindMatches = async (type: 'engineer' | 'supplier') => {
    if (!currentPrediction) return;
    
    setLoading(true);
    try {
      if (type === 'engineer') {
        const engineers = await mockApi.getMatchedEngineers(currentPrediction);
        setMatchedEngineers(engineers);
        toast.success(`Found ${engineers.length} matched engineers!`);
      } else {
        const suppliers = await mockApi.getMatchedSuppliers(currentPrediction);
        setMatchedSuppliers(suppliers);
        toast.success(`Found ${suppliers.length} matched suppliers!`);
      }
      setShowMatches(true);
    } catch (error) {
      toast.error('Failed to find matches');
    } finally {
      setLoading(false);
    }
  };

  const handleExpressInterest = async (id: string) => {
    try {
      await mockApi.expressInterest(currentPrediction?.id || '', id);
      toast.success('Interest expressed successfully!', {
        description: 'The engineer/supplier will be notified.',
      });
    } catch (error) {
      toast.error('Failed to express interest');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Energy Producer Dashboard</h1>
          <p className="text-muted-foreground">
            Create predictions and find the right team for your renewable energy project
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Form and Prediction */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Opportunity</CardTitle>
                <CardDescription>
                  Enter your project details to get an AI-powered energy potential prediction
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="e.g., New York, Los Angeles, Chicago"
                      {...register('location', { required: 'Location is required' })}
                    />
                    {errors.location && (
                      <p className="text-sm text-destructive mt-1">{errors.location.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="energyType">Energy Type</Label>
                    <Select
                      value={energyType}
                      onValueChange={(value) => setValue('energyType', value as any)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="solar">☀️ Solar</SelectItem>
                        <SelectItem value="wind">🌬️ Wind</SelectItem>
                        <SelectItem value="hydro">💧 Hydro</SelectItem>
                        <SelectItem value="geothermal">🌋 Geothermal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="capacity">Projected Capacity (kW) - Optional</Label>
                    <Input
                      id="capacity"
                      type="number"
                      step="0.1"
                      placeholder="e.g., 5.0"
                      {...register('capacity', { valueAsNumber: true })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description - Optional</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of your project..."
                      {...register('description')}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Generate Prediction
                  </Button>
                </form>
              </CardContent>
            </Card>

            {currentPrediction && (
              <PredictionCard
                prediction={currentPrediction}
                onRequestEngineer={() => handleFindMatches('engineer')}
                onRequestMaterials={() => handleFindMatches('supplier')}
              />
            )}

            {showMatches && (
              <MatchList
                engineers={matchedEngineers}
                suppliers={matchedSuppliers}
                onExpressInterest={handleExpressInterest}
                loading={loading}
              />
            )}
          </div>

          {/* Right Column - Map */}
          <div className="lg:sticky lg:top-8 h-[600px]">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Opportunity Map</CardTitle>
                <CardDescription>
                  {currentPrediction ? 'Your prediction location' : 'Map view'}
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[calc(100%-5rem)]">
                <MapView
                  predictions={currentPrediction ? [currentPrediction] : []}
                  engineers={showMatches ? matchedEngineers : []}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Producer;
