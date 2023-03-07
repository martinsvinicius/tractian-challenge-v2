import {
  GetWorkOrdersParams,
  WorkOrderGateway
} from '@/core/domain/gateways/work-order.gateway'
import { WorkOrder } from '@/core/domain/models/work-order'
import { AxiosInstance } from 'axios'

export class WorkOrderHttpGateway implements WorkOrderGateway {
  constructor(private http: AxiosInstance) {}

  async getWorkOrders(params?: GetWorkOrdersParams): Promise<WorkOrder[]> {
    const { data } = await this.http.get<WorkOrder[]>('/workorders', {
      params
    })

    return data
  }

  async updateOrder({ id, ...rest }: WorkOrder): Promise<WorkOrder> {
    const { data } = await this.http.put<WorkOrder>(`/workorders/${id}`, rest)

    return data
  }
}
