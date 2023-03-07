import { UnitGateway } from '@/core/domain/gateways/unit.gateway'
import { Unit } from '@/core/domain/models/unit'

export class GetUnitsUseCase {
  constructor(private unitGateway: UnitGateway) {}

  async execute(): Promise<Unit[]> {
    return this.unitGateway.getUnits()
  }
}
