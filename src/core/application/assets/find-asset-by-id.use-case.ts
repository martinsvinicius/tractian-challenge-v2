import { AssetGateway } from '@/core/domain/gateways/asset.gateway'

export class FindAssetByIdUseCase {
  constructor(private assetGateway: AssetGateway) {}

  execute(id: number) {
    return this.assetGateway.findAssetById(id)
  }
}
