import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import Landing from './Landing';
import RoleSelector from '@/components/RoleSelector';
import Producer from './Producer';
import Engineer from './Engineer';
import Supplier from './Supplier';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Presentation } from 'lucide-react';
import PitchModal from '@/components/PitchModal';

type View = 'landing' | 'roleSelector' | 'app';

const MainApp = () => {
  const { userRole, setUserRole } = useApp();
  const [view, setView] = useState<View>('landing');
  const [pitchOpen, setPitchOpen] = useState(false);

  const handleStartDemo = () => {
    setView('roleSelector');
  };

  const handleSelectRole = (role: 'producer' | 'engineer' | 'supplier') => {
    setUserRole(role);
    setView('app');
  };

  const handleBackToRoles = () => {
    setUserRole(null);
    setView('roleSelector');
  };

  const handleBackToLanding = () => {
    setUserRole(null);
    setView('landing');
  };

  if (view === 'landing') {
    return <Landing onStartDemo={handleStartDemo} />;
  }

  if (view === 'roleSelector') {
    return (
      <>
        <div className="fixed top-4 left-4 z-50">
          <Button variant="outline" onClick={handleBackToLanding}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
        <RoleSelector onSelectRole={handleSelectRole} />
      </>
    );
  }

  return (
    <div>
      {/* Top Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={handleBackToRoles}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Change Role
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Current role:</span>
              <span className="font-semibold capitalize">{userRole}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setPitchOpen(true)}>
              <Presentation className="w-4 h-4 mr-2" />
              View Pitch
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {userRole === 'producer' && <Producer />}
      {userRole === 'engineer' && <Engineer />}
      {userRole === 'supplier' && <Supplier />}

      <PitchModal open={pitchOpen} onClose={() => setPitchOpen(false)} />
    </div>
  );
};

export default MainApp;
