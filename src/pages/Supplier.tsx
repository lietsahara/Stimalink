import { useState, useEffect } from 'react';
import { mockApi } from '@/api/mockApi';
import { Supplier as SupplierType } from '@/data/sampleData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Search, Mail, Star, Clock, Package } from 'lucide-react';

const Supplier = () => {
  const [suppliers, setSuppliers] = useState<SupplierType[]>([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState<SupplierType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSuppliers();
  }, []);

  useEffect(() => {
    filterSuppliers();
  }, [suppliers, searchTerm]);

  const loadSuppliers = async () => {
    try {
      const data = await mockApi.getSuppliers();
      setSuppliers(data);
    } catch (error) {
      toast.error('Failed to load suppliers');
    } finally {
      setLoading(false);
    }
  };

  const filterSuppliers = () => {
    let filtered = [...suppliers];

    if (searchTerm) {
      filtered = filtered.filter(sup =>
        sup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sup.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sup.materials.some(m => m.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredSuppliers(filtered);
  };

  const handleContactSupplier = (supplier: SupplierType) => {
    toast.success(`Contact info copied!`, {
      description: supplier.contact,
    });
    navigator.clipboard.writeText(supplier.contact);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Supplier Directory</h1>
          <p className="text-muted-foreground">
            Find renewable energy materials and equipment suppliers
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5" />
                Search Suppliers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, region, or materials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                Showing {filteredSuppliers.length} of {suppliers.length} suppliers
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {filteredSuppliers.map((supplier) => (
              <Card
                key={supplier.id}
                className="animate-fade-in shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-strong)] transition-all"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{supplier.name}</CardTitle>
                        <CardDescription className="mt-1">
                          {supplier.region}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <span className="font-medium">{supplier.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Materials & Equipment</p>
                    <div className="flex flex-wrap gap-2">
                      {supplier.materials.map((material, i) => (
                        <Badge key={i} variant="outline">
                          {material}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Price Range</p>
                      <p className="font-semibold">{supplier.priceRange}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Lead Time
                      </p>
                      <p className="font-semibold">{supplier.leadTime}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                    <Mail className="w-4 h-4" />
                    <span>{supplier.contact}</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => handleContactSupplier(supplier)}
                      className="flex-1"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Copy Contact
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => toast.success('Quote request sent!')}
                    >
                      Request Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredSuppliers.length === 0 && !loading && (
              <Card>
                <CardContent className="p-8 text-center text-muted-foreground">
                  No suppliers match your search. Try different keywords.
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Supplier;
