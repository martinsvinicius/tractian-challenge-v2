import { Unit } from '../models/unit'

export interface UnitGateway {
  getUnits(): Promise<Unit[]>
  updateUnit(unit: Unit): Promise<Unit>
  findUnitById(id: number): Promise<Unit>
}
