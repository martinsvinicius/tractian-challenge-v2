import { WorkOrder } from '../models/work-order'

export interface GetWorkOrdersParams {
  assetId?: number
}

export interface WorkOrderGateway {
  getWorkOrders(params?: GetWorkOrdersParams): Promise<WorkOrder[]>
  updateOrder(order: WorkOrder): Promise<WorkOrder>
}
