import React from 'react';
import {
  LineChart as ReLineChart,
  Line,
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

interface LineChartProps {
  data: MultiSeriesDataPoint[];
  series: ChartSeries[];
  title?: string;
  description?: string;
  isLoading?: boolean;
  error?: string | null;
  exportable?: boolean;
  exportFilename?: string;
  xAxisKey?: string;
  zoomable?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
  className?: string;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  series,
  title,
  description,
  isLoading,
  error,
  exportable,
  exportFilename,
  xAxisKey = 'label',
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
        <ReLineChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey={xAxisKey}
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${valuePrefix}${v}${valueSuffix}`}
          />
          <Tooltip
            contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: 12 }}
            formatter={(value: number) => [`${valuePrefix}${value}${valueSuffix}`]}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          {series.map((s, i) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.name}
              stroke={s.color ?? CHART_COLORS[i % CHART_COLORS.length]}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          ))}
          {zoomable && <Brush dataKey={xAxisKey} height={20} stroke="#e5e7eb" travellerWidth={6} />}
        </ReLineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default LineChart;
