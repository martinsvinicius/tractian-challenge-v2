import { useMemo } from 'react'
import { useGetAssets } from '@/hooks/useGetAseets'
import ChartWrapper from './ChartWrapper'
import { AssetMetrics } from '@/core/domain/models/asset'
import { formatDateToBrazilian } from '@/utils/dateUtils'

type TooltipProps = {
  healthscore: number
  metrics: AssetMetrics
  name: string
}

const generateTooltip = ({ name, metrics, healthscore }: TooltipProps) => {
  return `<div>
      <strong>${name}</strong><br />
      <span>
        Health score: <strong>${healthscore}%</strong>
      </span><br />
      <span>
        Total Uptime: <strong>${Math.round(metrics.totalUptime)}hrs</strong>
      </span><br />
      <span>
        Total Collects: <strong>${metrics.totalCollectsUptime}</strong>
      </span><br />
      <span>
        Last Uptime: <strong>${formatDateToBrazilian(
          metrics.lastUptimeAt
        )}</strong>
      </span>
    </div>`
}

export function AssetsChart() {
  const { data: assetsData } = useGetAssets()

  const chartOptions = useMemo<Highcharts.Options | undefined>(() => {
    if (!assetsData?.map) return undefined

    return {
      chart: {
        type: 'column',
        height: 350
      },
      title: {
        text: 'Health Score by Assets'
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: 'Health score'
        }
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y:.1f}%'
          }
        }
      },
      tooltip: {
        formatter: function () {
          const { metrics } = this.point as any

          return generateTooltip({
            healthscore: this.y as number,
            metrics: metrics as AssetMetrics,
            name: this.point.name
          })
        }
      },
      series: [
        {
          name: 'Assets',
          data: assetsData.map((asset) => ({
            name: asset.name,
            y: asset.healthscore,
            metrics: asset.metrics
          })),
          type: 'column'
        }
      ]
    }
  }, [assetsData])

  if (!chartOptions) return null

  return <ChartWrapper options={chartOptions} />
}
