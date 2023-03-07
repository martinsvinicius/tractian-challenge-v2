import { UpdateWorkOrderUseCase } from '@/core/application/workOrders/update-work-orders.use-case'
import { WorkOrder } from '@/core/domain/models/work-order'
import { container, ContainerRegistry } from '@/core/infra/container'
import { useMutation } from '@tanstack/react-query'

const useCase = container.get<UpdateWorkOrderUseCase>(
  ContainerRegistry.UpdateWorkOrderUseCase
)

export const useMutateWorkOrder = () => {
  return useMutation((workOrder: WorkOrder) => useCase.execute(workOrder))
}
