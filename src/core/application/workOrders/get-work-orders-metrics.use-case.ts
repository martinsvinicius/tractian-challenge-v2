import { WorkOrderGateway } from '@/core/domain/gateways/work-order.gateway'

export class GetWorkOrdersMetricsUseCase {
  constructor(private workOrderGateway: WorkOrderGateway) {}

  async execute() {
    const workOrders = await this.workOrderGateway.getWorkOrders()

    return {
      total: workOrders.length,
      completed: workOrders.filter((order) => order.status === 'completed')
        .length,
      pending: workOrders.filter((order) => order.status !== 'completed').length
    }
  }
}
