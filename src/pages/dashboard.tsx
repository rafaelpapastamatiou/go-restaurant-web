import React from 'react';

import {
  SimpleGrid,
  theme,
  Button,
  useBreakpointValue,
} from '@chakra-ui/react';

import dynamic from 'next/dynamic';

import { useSession } from 'next-auth/client';

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

import { Card } from '../components/Card';

const options = {
  chart: {
    toolbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  grid: {
    show: false,
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600],
    },
    axisTicks: {
      color: theme.colors.gray[600],
    },
    categories: [
      '2021-03-18T00:00:00.000Z',
      '2021-03-19T00:00:00.000Z',
      '2021-03-20T00:00:00.000Z',
      '2021-03-21T00:00:00.000Z',
      '2021-03-22T00:00:00.000Z',
      '2021-03-23T00:00:00.000Z',
      '2021-03-24T00:00:00.000Z',
    ],
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    },
  },
};

const series = [{ name: 'series1', data: [31, 120, 10, 40, 22, 48, 31, 9] }];

export default function Dashboard(): JSX.Element {
  const [session, loading] = useSession();

  const minChildWidth = useBreakpointValue({
    base: '260px',
    xs: '360px',
    md: '480px',
  });

  return (
    <SimpleGrid
      flex="1"
      gap="6"
      minChildWidth={minChildWidth}
      align="flex-start"
    >
      <Card cardTitle="Content with title" titleSize="md">
        <Chart type="area" height={160} options={options} series={series} />
      </Card>
      <Card titleSize="md">
        <Chart type="area" height={160} options={options} series={series} />
      </Card>
      <Card
        cardTitle="Loading - Skeleton"
        titleSize="md"
        isLoading
        loadingIndicator="skeleton"
      >
        <Chart type="area" height={160} options={options} series={series} />
      </Card>
      <Card cardTitle="Loading - Spinner" titleSize="md" isLoading>
        <Chart type="area" height={160} options={options} series={series} />
      </Card>
      <Card cardTitle="Refreshing" titleSize="md" isRefreshing>
        <Chart type="area" height={160} options={options} series={series} />
      </Card>
      <Card
        cardTitle="With button"
        titleSize="md"
        extra={
          <Button as="a" size="sm" fontSize="sm" colorScheme="pink">
            Criar novo
          </Button>
        }
      >
        <Chart type="area" height={160} options={options} series={series} />
      </Card>
    </SimpleGrid>
  );
}

Dashboard.auth = true;
