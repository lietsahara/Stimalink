import { samplePredictions, sampleEngineers, sampleSuppliers, Prediction, Engineer, Supplier } from '@/data/sampleData';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface PredictionRequest {
  lat: number;
  lng: number;
  energyType: 'solar' | 'wind' | 'hydro' | 'geothermal';
  capacity?: number;
  description?: string;
  location: string;
}

export const mockApi = {
  // Generate prediction based on inputs
  async getPrediction(request: PredictionRequest): Promise<Prediction> {
    await delay(800); // Simulate API call
    
    // Simple prediction logic based on energy type and location
    const basePotential = {
      solar: 4.5,
      wind: 10.0,
      hydro: 7.5,
      geothermal: 15.0,
    };

    const potential = basePotential[request.energyType];
    const variance = (Math.random() - 0.5) * 2;
    const predictedKW = parseFloat((potential + variance).toFixed(1));
    
    const confidence: 'Low' | 'Medium' | 'High' = 
      predictedKW > potential ? 'High' : 
      predictedKW > potential * 0.7 ? 'Medium' : 'Low';

    const sparkline = Array.from({ length: 5 }, (_, i) => 
      parseFloat((predictedKW * (0.6 + i * 0.1)).toFixed(1))
    );

    return {
      id: `pred-${Date.now()}`,
      lat: request.lat,
      lng: request.lng,
      energyType: request.energyType,
      predictedKW,
      confidence,
      description: request.description || `${request.energyType} project`,
      location: request.location,
      sampleSparkline: sparkline,
    };
  },

  // Get all opportunities
  async getOpportunities(): Promise<Prediction[]> {
    await delay(300);
    return [...samplePredictions];
  },

  // Get matched engineers based on location and skills
  async getMatchedEngineers(prediction: Prediction): Promise<Engineer[]> {
    await delay(400);
    
    // Simple matching: filter by energy type in skills and sort by distance
    const skillMap: Record<string, string[]> = {
      solar: ['Solar Installation', 'Solar Design', 'PV Systems'],
      wind: ['Wind Energy', 'Turbine Installation'],
      hydro: ['Hydro Systems', 'Civil Engineering'],
      geothermal: ['Geothermal Systems'],
    };

    const relevantSkills = skillMap[prediction.energyType] || [];
    
    return sampleEngineers
      .filter(eng => 
        eng.skills.some(skill => 
          relevantSkills.some(rs => skill.includes(rs))
        )
      )
      .sort((a, b) => {
        // Calculate simple distance (not accurate, just for demo)
        const distA = Math.sqrt(
          Math.pow(a.lat - prediction.lat, 2) + 
          Math.pow(a.lng - prediction.lng, 2)
        );
        const distB = Math.sqrt(
          Math.pow(b.lat - prediction.lat, 2) + 
          Math.pow(b.lng - prediction.lng, 2)
        );
        return distA - distB;
      })
      .slice(0, 4);
  },

  // Get matched suppliers based on materials needed
  async getMatchedSuppliers(prediction: Prediction): Promise<Supplier[]> {
    await delay(400);
    
    const materialMap: Record<string, string[]> = {
      solar: ['Solar Panels', 'Inverters', 'Batteries'],
      wind: ['Turbine Blades', 'Wind Turbines', 'Generators'],
      hydro: ['Turbines', 'Piping', 'Control Valves'],
      geothermal: ['Heat Pumps', 'Piping'],
    };

    const relevantMaterials = materialMap[prediction.energyType] || [];
    
    return sampleSuppliers
      .filter(sup => 
        sup.materials.some(mat => 
          relevantMaterials.some(rm => mat.includes(rm))
        )
      )
      .slice(0, 4);
  },

  // Get all engineers
  async getEngineers(): Promise<Engineer[]> {
    await delay(300);
    return [...sampleEngineers];
  },

  // Get all suppliers
  async getSuppliers(): Promise<Supplier[]> {
    await delay(300);
    return [...sampleSuppliers];
  },

  // Express interest (simulated)
  async expressInterest(opportunityId: string, userId: string): Promise<{ success: boolean }> {
    await delay(500);
    console.log(`Interest expressed: User ${userId} → Opportunity ${opportunityId}`);
    return { success: true };
  },

  // Request materials (simulated)
  async requestMaterials(opportunityId: string, supplierId: string): Promise<{ success: boolean }> {
    await delay(500);
    console.log(`Materials requested: Opportunity ${opportunityId} → Supplier ${supplierId}`);
    return { success: true };
  },
};
