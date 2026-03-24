import React, { useState } from 'react';
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Sector,
} from 'recharts';
import ChartContainer from './ChartContainer';
import { CHART_COLORS } from '../../utils/chart.utils';
import type { DataPoint } from '../../types/charts.types';

interface PieChartProps {
  data: DataPoint[];
  title?: string;
  description?: string;
  isLoading?: boolean;
  error?: string | null;
  exportable?: boolean;
  exportFilename?: string;
  donut?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
  className?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  return (
    <g>
      <text x={cx} y={cy - 8} textAnchor="middle" fill="#111827" className="text-sm font-semibold" fontSize={13}>
        {payload.label}
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill="#6b7280" fontSize={11}>
        {value} ({(percent * 100).toFixed(1)}%)
      </text>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 6} startAngle={startAngle} endAngle={endAngle} fill={fill} />
      <Sector cx={cx} cy={cy} innerRadius={outerRadius + 10} outerRadius={outerRadius + 14} startAngle={startAngle} endAngle={endAngle} fill={fill} />
    </g>
  );
};

const PieChart: React.FC<PieChartProps> = ({
  data,
  title,
  description,
  isLoading,
  error,
  exportable,
  exportFilename,
  donut = false,
  valuePrefix = '',
  valueSuffix = '',
  className,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined);

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
        <RePieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="label"
            cx="50%"
            cy="50%"
            innerRadius={donut ? 60 : 0}
            outerRadius={100}
            activeIndex={activeIndex}
            activeShape={donut ? renderActiveShape : undefined}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(undefined)}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: 12 }}
            formatter={(value: number) => [`${valuePrefix}${value}${valueSuffix}`]}
          />
          <Legend wrapperStyle={{ fontSize: 12 }} />
        </RePieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default PieChart;
