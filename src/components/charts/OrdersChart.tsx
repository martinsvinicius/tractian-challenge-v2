import { useGetWorkOrdersMetrics } from '@/hooks/useGetWorkOrdersMetrics'
import { useMemo } from 'react'
import ChartWrapper from './ChartWrapper'

export function OrdersChart() {
  const { data: ordersMetrics } = useGetWorkOrdersMetrics()

  const chartOptions = useMemo<Highcharts.Options | undefined>(() => {
    if (!ordersMetrics) return undefined

    return {
      chart: {
        type: 'pie',
        height: 350
      },
      title: {
        text: 'Work Orders Completion'
      },
      series: [
        {
          name: 'Orders',
          colorByPoint: true,
          type: 'pie',
          data: [
            {
              name: 'Pending',
              y: ordersMetrics.pending
            },
            {
              name: 'Completed',
              y: ordersMetrics.completed
            }
          ]
        }
      ]
    }
  }, [ordersMetrics])

  if (!chartOptions) return null

  return <ChartWrapper options={chartOptions} />
}
