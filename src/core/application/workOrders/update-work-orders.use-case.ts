import { WorkOrderGateway } from '@/core/domain/gateways/work-order.gateway'
import { WorkOrder } from '@/core/domain/models/work-order'

export class UpdateWorkOrderUseCase {
  constructor(private workOrderGateway: WorkOrderGateway) {}

  async execute(order: WorkOrder): Promise<WorkOrder> {
    return this.workOrderGateway.updateOrder(order)
  }
}
