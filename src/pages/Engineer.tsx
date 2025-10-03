import { useState, useEffect } from 'react';
import { mockApi } from '@/api/mockApi';
import { Prediction } from '@/data/sampleData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import MapView from '@/components/MapView';
import PredictionCard from '@/components/PredictionCard';
import { toast } from 'sonner';
import { Search, Filter } from 'lucide-react';

const Engineer = () => {
  const [opportunities, setOpportunities] = useState<Prediction[]>([]);
  const [filteredOpportunities, setFilteredOpportunities] = useState<Prediction[]>([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Prediction | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [energyFilter, setEnergyFilter] = useState<string>('all');
  const [confidenceFilter, setConfidenceFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOpportunities();
  }, []);

  useEffect(() => {
    filterOpportunities();
  }, [opportunities, searchTerm, energyFilter, confidenceFilter]);

  const loadOpportunities = async () => {
    try {
      const data = await mockApi.getOpportunities();
      setOpportunities(data);
    } catch (error) {
      toast.error('Failed to load opportunities');
    } finally {
      setLoading(false);
    }
  };

  const filterOpportunities = () => {
    let filtered = [...opportunities];

    if (searchTerm) {
      filtered = filtered.filter(opp =>
        opp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        opp.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (energyFilter !== 'all') {
      filtered = filtered.filter(opp => opp.energyType === energyFilter);
    }

    if (confidenceFilter !== 'all') {
      filtered = filtered.filter(opp => opp.confidence === confidenceFilter);
    }

    setFilteredOpportunities(filtered);
  };

  const handleExpressInterest = async () => {
    if (!selectedOpportunity) return;

    try {
      await mockApi.expressInterest(selectedOpportunity.id, 'engineer-demo');
      toast.success('Interest expressed!', {
        description: 'The producer will be notified of your interest.',
      });
    } catch (error) {
      toast.error('Failed to express interest');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Engineer Dashboard</h1>
          <p className="text-muted-foreground">
            Browse predicted opportunities and connect with energy producers
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Filters and List */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filter Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by location or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Energy Type</label>
                    <Select value={energyFilter} onValueChange={setEnergyFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="solar">☀️ Solar</SelectItem>
                        <SelectItem value="wind">🌬️ Wind</SelectItem>
                        <SelectItem value="hydro">💧 Hydro</SelectItem>
                        <SelectItem value="geothermal">🌋 Geothermal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Confidence</label>
                    <Select value={confidenceFilter} onValueChange={setConfidenceFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="High">⭐ High</SelectItem>
                        <SelectItem value="Medium">⚠️ Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Showing {filteredOpportunities.length} of {opportunities.length} opportunities</span>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {filteredOpportunities.map((opportunity) => (
                <div
                  key={opportunity.id}
                  className={`cursor-pointer transition-all ${
                    selectedOpportunity?.id === opportunity.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedOpportunity(opportunity)}
                >
                  <PredictionCard
                    prediction={opportunity}
                    showActions={false}
                  />
                </div>
              ))}

              {filteredOpportunities.length === 0 && !loading && (
                <Card>
                  <CardContent className="p-8 text-center text-muted-foreground">
                    No opportunities match your filters. Try adjusting your search criteria.
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Right Column - Map and Details */}
          <div className="lg:sticky lg:top-8 space-y-6">
            <Card className="h-[400px]">
              <CardHeader>
                <CardTitle>Opportunities Map</CardTitle>
                <CardDescription>
                  Click on map markers or cards to view details
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[calc(100%-5rem)]">
                <MapView
                  predictions={filteredOpportunities}
                  onPredictionClick={setSelectedOpportunity}
                />
              </CardContent>
            </Card>

            {selectedOpportunity && (
              <Card>
                <CardHeader>
                  <CardTitle>Selected Opportunity</CardTitle>
                  <CardDescription>
                    Review details and express interest
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{selectedOpportunity.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Energy Type</p>
                      <p className="font-medium capitalize">{selectedOpportunity.energyType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Predicted Potential</p>
                      <p className="font-medium">{selectedOpportunity.predictedKW} kW</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Confidence</p>
                      <Badge className={
                        selectedOpportunity.confidence === 'High' ? 'bg-primary' :
                        selectedOpportunity.confidence === 'Medium' ? 'bg-accent' : 'bg-muted'
                      }>
                        {selectedOpportunity.confidence}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Description</p>
                    <p>{selectedOpportunity.description}</p>
                  </div>

                  <button
                    onClick={handleExpressInterest}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium transition-colors"
                  >
                    Express Interest
                  </button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Engineer;
