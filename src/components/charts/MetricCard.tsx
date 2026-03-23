import React from 'react';
import type { MetricCardData } from '../../types/charts.types';
import { formatPercent } from '../../utils/chart.utils';

interface MetricCardProps extends MetricCardData {
  isLoading?: boolean;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeLabel,
  icon,
  prefix = '',
  suffix = '',
  isLoading = false,
  className = '',
}) => {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3 ${className}`}
      role="region"
      aria-label={`${title} metric`}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        {icon && (
          <span className="w-9 h-9 rounded-xl bg-stellar/10 flex items-center justify-center text-stellar" aria-hidden="true">
            {icon}
          </span>
        )}
      </div>

      {isLoading ? (
        <div className="h-8 w-24 bg-gray-100 rounded-lg animate-pulse" aria-label="Loading" />
      ) : (
        <div className="flex items-end gap-2">
          <span className="text-3xl font-bold text-gray-900 leading-none tabular-nums">
            {prefix}{value}{suffix}
          </span>
        </div>
      )}

      {change !== undefined && !isLoading && (
        <div className="flex items-center gap-1.5">
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
            }`}
            aria-label={`${isPositive ? 'Increase' : 'Decrease'} of ${Math.abs(change)}%`}
          >
            {isPositive ? '↑' : '↓'} {formatPercent(Math.abs(change))}
          </span>
          {changeLabel && <span className="text-xs text-gray-400">{changeLabel}</span>}
        </div>
      )}
    </div>
  );
};

export default MetricCard;
