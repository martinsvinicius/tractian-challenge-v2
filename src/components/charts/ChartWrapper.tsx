import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

interface ChartProps extends HighchartsReact.Props {
  options: Highcharts.Options
}

export default function ChartWrapper({ options, ...rest }: ChartProps) {
  return <HighchartsReact highcharts={Highcharts} options={options} {...rest} />
}
