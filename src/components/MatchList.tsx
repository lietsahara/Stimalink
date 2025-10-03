import { Engineer, Supplier } from '@/data/sampleData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mail, Star, MapPin, Clock } from 'lucide-react';

interface MatchListProps {
  engineers?: Engineer[];
  suppliers?: Supplier[];
  onExpressInterest?: (id: string) => void;
  loading?: boolean;
}

const MatchList = ({ engineers = [], suppliers = [], onExpressInterest, loading = false }: MatchListProps) => {
  const availabilityColors = {
    Available: 'bg-primary text-primary-foreground',
    Busy: 'bg-accent text-accent-foreground',
    Booked: 'bg-muted text-muted-foreground',
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-muted rounded w-1/2" />
              <div className="h-4 bg-muted rounded w-3/4 mt-2" />
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {engineers.length > 0 && (
        <>
          <h3 className="text-lg font-semibold">Matched Engineers</h3>
          {engineers.map((engineer) => (
            <Card key={engineer.id} className="animate-fade-in shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-all">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{engineer.avatar}</span>
                    <div>
                      <CardTitle className="text-lg">{engineer.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {engineer.location}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={availabilityColors[engineer.availability]}>
                    {engineer.availability}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-1">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {engineer.skills.map((skill, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="font-medium">{engineer.rating}</span>
                  <span className="ml-2 flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {engineer.contact}
                  </span>
                </div>
                <Button 
                  onClick={() => onExpressInterest?.(engineer.id)} 
                  className="w-full"
                  variant="default"
                >
                  Express Interest
                </Button>
              </CardContent>
            </Card>
          ))}
        </>
      )}

      {suppliers.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mt-6">Matched Suppliers</h3>
          {suppliers.map((supplier) => (
            <Card key={supplier.id} className="animate-fade-in shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-all">
              <CardHeader>
                <CardTitle className="text-lg">{supplier.name}</CardTitle>
                <CardDescription>{supplier.region}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium mb-1">Materials</p>
                  <div className="flex flex-wrap gap-1">
                    {supplier.materials.map((material, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {material}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Price Range</p>
                    <p className="font-medium">{supplier.priceRange}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Lead Time
                    </p>
                    <p className="font-medium">{supplier.leadTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="w-4 h-4 fill-accent text-accent" />
                  <span className="font-medium">{supplier.rating}</span>
                  <span className="ml-2 flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {supplier.contact}
                  </span>
                </div>
                <Button 
                  onClick={() => onExpressInterest?.(supplier.id)} 
                  className="w-full"
                  variant="outline"
                >
                  Request Quote
                </Button>
              </CardContent>
            </Card>
          ))}
        </>
      )}

      {engineers.length === 0 && suppliers.length === 0 && !loading && (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            No matches found. Create a prediction to see matched engineers and suppliers.
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MatchList;
