import { GetWorkOrdersMetricsUseCase } from '@/core/application/workOrders/get-work-orders-metrics.use-case'
import { container, ContainerRegistry } from '@/core/infra/container'
import { useQuery } from '@tanstack/react-query'

const useCase = container.get<GetWorkOrdersMetricsUseCase>(
  ContainerRegistry.GetWorkOrdersMetricsUseCase
)

export const useGetWorkOrdersMetrics = () => {
  return useQuery(['workOrdersMetrics'], () => useCase.execute())
}
