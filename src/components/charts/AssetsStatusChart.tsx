import { useGetAssetsStatusMetrics } from '@/hooks/useGetAssetsStatusMetrics'
import { useMemo } from 'react'
import ChartWrapper from './ChartWrapper'

export function AssetsStatusChart() {
  const { data: assetsMetrics } = useGetAssetsStatusMetrics()

  const chartOptions = useMemo<Highcharts.Options | undefined>(() => {
    if (!assetsMetrics) return undefined

    return {
      chart: {
        type: 'pie',
        height: 350
      },
      title: {
        text: 'Assets Status'
      },
      series: [
        {
          name: 'Assets',
          colorByPoint: true,
          type: 'pie',
          data: [
            {
              name: 'In Alert',
              y: assetsMetrics.inAlert
            },
            {
              name: 'In Downtime',
              y: assetsMetrics.inDowntime
            },
            {
              name: 'In Operation',
              y: assetsMetrics.inOperation
            }
          ]
        }
      ]
    }
  }, [assetsMetrics])

  if (!chartOptions) return null

  return <ChartWrapper options={chartOptions} />
}
