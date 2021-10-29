import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Label,
  ResponsiveContainer,
  ReferenceLine,
  Tooltip,
} from 'recharts';
import { Box, Text, BoxProps, useTheme } from '@chakra-ui/react';

type FlowPoint = {
  value: number;
  index: number;
};

interface FlowChartProps extends BoxProps {
  fluxo: FlowPoint[];
  maximo?: FlowPoint;
}

function GraficoFluxo({ fluxo, maximo, ...props }: FlowChartProps) {
  const theme = useTheme();

  return (
    <Box p={2} w="full" h="300px" {...props}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={fluxo}
          margin={{
            top: 5,
            right: 30,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="index"
            interval={250}
            tickFormatter={(x) => {
              return x.toFixed(1);
            }}
          >
            <Label offset={0} position="bottom">
              Segundos [s]
            </Label>
          </XAxis>
          <YAxis>
            <Label offset={20} position="center" angle={-90}>
              Fluxo [L/s]
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="value"
            stroke={theme.colors.teal['400']}
            strokeWidth={3}
            dot={<Dot peak={maximo.value} />}
          />
          <ReferenceLine
            y={maximo.value}
            label={{
              value: `${maximo.value} L/s`,
              position: 'top',
              fontSize: '1.25rem',
            }}
            stroke={theme.colors.red['600']}
            strokeDasharray="5 5"
            isFront={false}
          />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default GraficoFluxo;

const Dot = (props) => {
  const { cx, cy, peak, value } = props;
  const theme = useTheme();
  if (value === peak) {
    return <circle cx={cx} cy={cy} r={4} fill={theme.colors.red['600']} />;
  }
  return null;
};

const CustomTooltip = (props) => {
  const { active, payload, label } = props;
  if (active && payload && payload.length) {
    return (
      <Box bg="blackAlpha.700" color="white" rounded="lg" px={4} py={2}>
        <Box>
          <Text as="span" fontWeight="semibold">
            fluxo:{' '}
          </Text>
          <Text as="span">{payload[0].value}</Text>
          <Text as="span"> L/s</Text>
        </Box>
        <Box>
          <Text as="span" fontWeight="semibold">
            tempo:{' '}
          </Text>
          <Text as="span">{Number(label).toFixed(2)}</Text>
          <Text as="span"> s</Text>
        </Box>
      </Box>
    );
  }

  return null;
};
