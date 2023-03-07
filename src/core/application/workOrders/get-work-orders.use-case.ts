import {
  GetWorkOrdersParams,
  WorkOrderGateway
} from '@/core/domain/gateways/work-order.gateway'

export type GetWorkOrdersUseCaseParams = GetWorkOrdersParams

export class GetWorkOrdersUseCase {
  constructor(private workOrderGateway: WorkOrderGateway) {}

  execute(params?: GetWorkOrdersUseCaseParams) {
    return this.workOrderGateway.getWorkOrders(params)
  }
}
