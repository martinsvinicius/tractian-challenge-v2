import {
  GetWorkOrdersUseCase,
  GetWorkOrdersUseCaseParams
} from '@/core/application/workOrders/get-work-orders.use-case'
import { container, ContainerRegistry } from '@/core/infra/container'
import { useQuery } from '@tanstack/react-query'

const useCase = container.get<GetWorkOrdersUseCase>(
  ContainerRegistry.GetWorkOrdersUseCase
)

export const useGetWorkOrders = (params?: GetWorkOrdersUseCaseParams) => {
  const paramsValues = params ? Object.values(params) : []

  return useQuery(['workOrders', ...paramsValues], () =>
    useCase.execute(params)
  )
}
