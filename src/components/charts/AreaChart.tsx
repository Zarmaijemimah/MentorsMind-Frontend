import React from 'react';
import {
  AreaChart as ReAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from 'recharts';
import ChartContainer from './ChartContainer';
import { CHART_COLORS } from '../../utils/chart.utils';
import type { MultiSeriesDataPoint, ChartSeries } from '../../types/charts.types';

interface AreaChartProps {
  data: MultiSeriesDataPoint[];
  series: ChartSeries[];
  title?: string;
  description?: string;
  isLoading?: boolean;
  error?: string | null;
  exportable?: boolean;
  exportFilename?: string;
  xAxisKey?: string;
  stacked?: boolean;
  zoomable?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
  className?: string;
}

const AreaChart: React.FC<AreaChartProps> = ({
  data,
  series,
  title,
  description,
  isLoading,
  error,
  exportable,
  exportFilename,
  xAxisKey = 'label',
  stacked = false,
  zoomable = false,
  valuePrefix = '',
  valueSuffix = '',
  className,
}) => {
  return (
    <ChartContainer
      title={title}
      description={description}
      isLoading={isLoading}
      error={error}
      exportable={exportable}
      exportFilename={exportFilename}
      className={className}
    >
      <ResponsiveContainer width="100%" height={300}>
        <ReAreaChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
          <defs>
            {series.map((s, i) => {
              const color = s.color ?? CHART_COLORS[i % CHART_COLORS.length];
              return (
                <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              );
            })}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey={xAxisKey} tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${valuePrefix}${v}${valueSuffix}`} />
          <Tooltip
            contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: 12 }}
            formatter={(value: number) => [`${valuePrefix}${value}${valueSuffix}`]}
          />
          {series.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} />}
          {series.map((s, i) => {
            const color = s.color ?? CHART_COLORS[i % CHART_COLORS.length];
            return (
              <Area
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.name}
                stroke={color}
                strokeWidth={2}
                fill={`url(#grad-${s.key})`}
                stackId={stacked ? 'stack' : undefined}
              />
            );
          })}
          {zoomable && <Brush dataKey={xAxisKey} height={20} stroke="#e5e7eb" travellerWidth={6} />}
        </ReAreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default AreaChart;
