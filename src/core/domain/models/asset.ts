export interface Asset {
  id: number
  sensors: string[]
  model: string
  status: string
  healthscore: number
  healthHistory: AssetHealthHistory[]
  name: string
  image: string
  specifications: AssetSpecifications
  metrics: AssetMetrics
  unitId: number
  companyId: number
  assignedUserIds: number[]
}

export interface AssetSpecifications {
  maxTemp?: number
  power?: number
  rpm?: number
}

export interface AssetMetrics {
  totalCollectsUptime: number
  totalUptime: number
  lastUptimeAt: string
}

export interface AssetHealthHistory {
  status: string
  timestamp: string
}