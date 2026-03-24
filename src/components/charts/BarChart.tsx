import React from 'react';
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import ChartContainer from './ChartContainer';
import { CHART_COLORS } from '../../utils/chart.utils';
import type { MultiSeriesDataPoint, ChartSeries } from '../../types/charts.types';

interface BarChartProps {
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
  horizontal?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
  className?: string;
}

const BarChart: React.FC<BarChartProps> = ({
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
  horizontal = false,
  valuePrefix = '',
  valueSuffix = '',
  className,
}) => {
  const isSingleSeries = series.length === 1;

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
        <ReBarChart
          data={data}
          layout={horizontal ? 'vertical' : 'horizontal'}
          margin={{ top: 4, right: 16, left: 0, bottom: 4 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          {horizontal ? (
            <>
              <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${valuePrefix}${v}${valueSuffix}`} />
              <YAxis type="category" dataKey={xAxisKey} tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={80} />
            </>
          ) : (
            <>
              <XAxis dataKey={xAxisKey} tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} tickFormatter={(v) => `${valuePrefix}${v}${valueSuffix}`} />
            </>
          )}
          <Tooltip
            contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: 12 }}
            formatter={(value: number) => [`${valuePrefix}${value}${valueSuffix}`]}
          />
          {series.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} />}
          {series.map((s, i) => (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.name}
              fill={s.color ?? CHART_COLORS[i % CHART_COLORS.length]}
              stackId={stacked ? 'stack' : undefined}
              radius={stacked ? [0, 0, 0, 0] : [4, 4, 0, 0]}
            >
              {isSingleSeries &&
                data.map((_, idx) => (
                  <Cell key={idx} fill={CHART_COLORS[idx % CHART_COLORS.length]} />
                ))}
            </Bar>
          ))}
        </ReBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default BarChart;
