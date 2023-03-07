import { GetAssetsStatusMetricsUseCase } from '@/core/application/assets/get-assets-status-metrics.use-case'
import { container, ContainerRegistry } from '@/core/infra/container'
import { useQuery } from '@tanstack/react-query'

const useCase = container.get<GetAssetsStatusMetricsUseCase>(
  ContainerRegistry.GetAssetsStatusMetricsUseCase
)

export const useGetAssetsStatusMetrics = () => {
  return useQuery(['assetsStatusMetrics'], () => useCase.execute())
}
