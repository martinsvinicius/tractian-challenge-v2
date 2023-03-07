import { UnitGateway } from '@/core/domain/gateways/unit.gateway'
import { Unit } from '@/core/domain/models/unit'
import { AxiosInstance } from 'axios'

export class UnitHttpGateway implements UnitGateway {
  constructor(private http: AxiosInstance) {}

  async getUnits(): Promise<Unit[]> {
    const { data } = await this.http.get<Unit[]>('/units')

    return data
  }

  async updateUnit({ id, ...rest }: Unit): Promise<Unit> {
    const { data } = await this.http.put<Unit>(`/units/${id}`, rest)

    return data
  }

  async findUnitById(id: number): Promise<Unit> {
    const { data } = await this.http.get<Unit>(`/units/${id}`)

    return data
  }
}
