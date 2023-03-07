import { UnitGateway } from '@/core/domain/gateways/unit.gateway'
import { Unit } from '@/core/domain/models/unit'

export class FindUnitByIdUseCase {
  constructor(private unitGateway: UnitGateway) {}

  async execute(id: number): Promise<Unit> {
    return this.unitGateway.findUnitById(id)
  }
}
