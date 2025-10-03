import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Wrench, Package } from 'lucide-react';

interface RoleSelectorProps {
  onSelectRole: (role: 'producer' | 'engineer' | 'supplier') => void;
}

const RoleSelector = ({ onSelectRole }: RoleSelectorProps) => {
  const roles = [
    {
      id: 'producer' as const,
      title: 'Energy Producer',
      description: 'Discover potential and get matched with engineers and suppliers',
      icon: Zap,
      color: 'text-primary',
    },
    {
      id: 'engineer' as const,
      title: 'Engineer',
      description: 'Find opportunities and connect with producers',
      icon: Wrench,
      color: 'text-secondary',
    },
    {
      id: 'supplier' as const,
      title: 'Supplier',
      description: 'Connect with producers who need your materials',
      icon: Package,
      color: 'text-accent',
    },
  ];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-5xl w-full space-y-8 animate-fade-in">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Choose Your Role</h1>
          <p className="text-muted-foreground text-lg">
            Select how you'd like to use Power Connect Circle
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Card
                key={role.id}
                className="hover:shadow-[var(--shadow-strong)] transition-all cursor-pointer group"
                onClick={() => onSelectRole(role.id)}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4">
                    <Icon className={`w-16 h-16 ${role.color} group-hover:scale-110 transition-transform`} />
                  </div>
                  <CardTitle className="text-xl">{role.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="default">
                    Continue as {role.title}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;
