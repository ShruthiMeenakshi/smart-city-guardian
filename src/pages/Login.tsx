import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useRole, Role } from '@/contexts/RoleContext';
import {
  Zap,
  Shield,
  Users,
  Crown,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  User,
  Building2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const roleCards: { role: Role; label: string; description: string; icon: React.ElementType; color: string; bgColor: string; defaultRoute: string }[] = [
  {
    role: 'Commissioner',
    label: 'Commissioner',
    description: 'Full city-wide analytics, intelligence hub, route optimization & governance controls.',
    icon: Crown,
    color: 'text-primary',
    bgColor: 'bg-primary/10 border-primary/20 hover:border-primary/40',
    defaultRoute: '/',
  },
  {
    role: 'Inspector',
    label: 'Field Inspector',
    description: 'Inspection queue, assigned reports, field routes & high-priority alerts.',
    icon: Shield,
    color: 'text-warning',
    bgColor: 'bg-warning/10 border-warning/20 hover:border-warning/40',
    defaultRoute: '/inspector',
  },
  {
    role: 'Public',
    label: 'Citizen',
    description: 'Ward dashboard, AI waste classifier, report issues, eco-rewards & rankings.',
    icon: Users,
    color: 'text-success',
    bgColor: 'bg-success/10 border-success/20 hover:border-success/40',
    defaultRoute: '/public',
  },
];

const Login = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState<'role' | 'credentials'>('role');
  const [error, setError] = useState('');
  const { login } = useRole();
  const navigate = useNavigate();

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setError('');
  };

  const handleContinue = () => {
    if (!selectedRole) return;
    setStep('credentials');
    setError('');
  };

  const handleLogin = () => {
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!password.trim()) {
      setError('Please enter a password');
      return;
    }
    if (!selectedRole) return;

    // Fixed credentials for Commissioner and Inspector
    if (selectedRole === 'Commissioner') {
      if (name.trim() !== 'Chitra Vijayan' || password !== 'Chitra@Madurai') {
        setError('Invalid credentials for Commissioner');
        return;
      }
    } else if (selectedRole === 'Inspector') {
      if (name.trim() !== 'Vijayendra Bidari' || password !== 'Vijayendra@Madurai') {
        setError('Invalid credentials for Inspector');
        return;
      }
    }
    // Public role — any non-empty credentials accepted

    const card = roleCards.find(c => c.role === selectedRole)!;
    login(name.trim(), selectedRole);
    navigate(card.defaultRoute);
  };

  const handleBack = () => {
    setStep('role');
    setError('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-success/5 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 15, 0], y: [0, 15, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-warning/3 blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg relative z-10"
      >
        {/* Logo header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className="h-16 w-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4"
          >
            <Zap className="h-8 w-8 text-primary" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-foreground"
          >
            MadurAI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-muted-foreground mt-1 uppercase tracking-widest"
          >
            Urban Intelligence Grid
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-2 mt-3"
          >
            <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Madurai Smart City Corporation</span>
          </motion.div>
        </div>

        {/* Card */}
        <motion.div
          layout
          className="rounded-xl bg-card border border-border p-6 shadow-lg"
        >
          <AnimatePresence mode="wait">
            {step === 'role' ? (
              <motion.div
                key="role-step"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className="text-lg font-semibold text-foreground mb-1">Select Your Role</h2>
                <p className="text-xs text-muted-foreground mb-5">Choose how you want to access the platform</p>

                <div className="space-y-3">
                  {roleCards.map((card, i) => (
                    <motion.button
                      key={card.role}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      onClick={() => handleRoleSelect(card.role)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedRole === card.role
                          ? card.bgColor + ' ring-1 ring-offset-1 ring-offset-background'
                          : 'border-border hover:border-muted-foreground/30 bg-muted/30'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${selectedRole === card.role ? card.bgColor.split(' ')[0] : 'bg-muted'}`}>
                          <card.icon className={`h-5 w-5 ${selectedRole === card.role ? card.color : 'text-muted-foreground'}`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className={`text-sm font-semibold ${selectedRole === card.role ? 'text-foreground' : 'text-foreground'}`}>
                              {card.label}
                            </span>
                            {selectedRole === card.role && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className={`h-5 w-5 rounded-full flex items-center justify-center ${card.bgColor.split(' ')[0]}`}
                              >
                                <div className={`h-2.5 w-2.5 rounded-full ${card.color.replace('text-', 'bg-')}`} />
                              </motion.div>
                            )}
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{card.description}</p>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <Button
                  onClick={handleContinue}
                  disabled={!selectedRole}
                  className="w-full mt-5 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="cred-step"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
              >
                {/* Selected role badge */}
                {selectedRole && (() => {
                  const card = roleCards.find(c => c.role === selectedRole)!;
                  return (
                    <div className="flex items-center gap-2 mb-5">
                      <button onClick={handleBack} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                        ← Back
                      </button>
                      <div className="flex-1" />
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${card.bgColor.split(' ')[0]} ${card.color}`}>
                        <card.icon className="h-3 w-3" />
                        {card.label}
                      </div>
                    </div>
                  );
                })()}

                <h2 className="text-lg font-semibold text-foreground mb-1">Sign In</h2>
                <p className="text-xs text-muted-foreground mb-5">Enter your credentials to continue</p>

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="text-xs font-medium text-muted-foreground block mb-1.5">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => { setName(e.target.value); setError(''); }}
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                        placeholder="Enter your name"
                        className="w-full bg-input text-foreground text-sm rounded-lg pl-10 pr-3 py-2.5 border border-border outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary placeholder:text-muted-foreground transition-all"
                        autoFocus
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="text-xs font-medium text-muted-foreground block mb-1.5">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); setError(''); }}
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                        placeholder="Enter password"
                        className="w-full bg-input text-foreground text-sm rounded-lg pl-10 pr-10 py-2.5 border border-border outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary placeholder:text-muted-foreground transition-all"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Error */}
                  <AnimatePresence>
                    {error && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-destructive font-medium"
                      >
                        {error}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <Button
                    onClick={handleLogin}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <Lock className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </div>

                <p className="text-[10px] text-muted-foreground text-center mt-4">
                  Demo mode — enter any name & password to continue
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-[10px] text-muted-foreground mt-6"
        >
          Powered by AI · Madurai Corporation Smart City Initiative © 2026
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login;
