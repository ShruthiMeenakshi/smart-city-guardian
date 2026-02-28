import { motion } from 'framer-motion';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';
import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon: LucideIcon;
  trend?: { value: number; positive: boolean };
  decimals?: number;
  variant?: 'primary' | 'secondary' | 'warning' | 'destructive' | 'info';
}

const variantStyles: Record<string, string> = {
  primary: 'border-primary/20 hover:border-primary/40',
  secondary: 'border-secondary/20 hover:border-secondary/40',
  warning: 'border-warning/20 hover:border-warning/40',
  destructive: 'border-destructive/20 hover:border-destructive/40',
  info: 'border-info/20 hover:border-info/40',
};

const iconVariantStyles: Record<string, string> = {
  primary: 'text-primary bg-primary/10',
  secondary: 'text-secondary bg-secondary/10',
  warning: 'text-warning bg-warning/10',
  destructive: 'text-destructive bg-destructive/10',
  info: 'text-info bg-info/10',
};

export function KPICard({ title, value, suffix = '', prefix = '', icon: Icon, trend, decimals = 0, variant = 'primary' }: KPICardProps) {
  const animatedValue = useAnimatedCounter(value, 1500, decimals);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-lg bg-card p-5 border transition-all duration-300 card-glow ${variantStyles[variant]}`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{title}</span>
        <div className={`p-2 rounded-md ${iconVariantStyles[variant]}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold font-mono text-foreground">
          {prefix}{animatedValue}{suffix}
        </span>
        {trend && (
          <span className={`text-xs font-medium mb-1 ${trend.positive ? 'text-success' : 'text-destructive'}`}>
            {trend.positive ? '↑' : '↓'} {trend.value}%
          </span>
        )}
      </div>
    </motion.div>
  );
}
