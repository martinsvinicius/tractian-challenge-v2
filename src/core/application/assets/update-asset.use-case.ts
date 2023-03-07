import { AssetGateway } from '@/core/domain/gateways/asset.gateway'
import { Asset } from '@/core/domain/models/asset'

export class UpdateAssetUseCase {
  constructor(private assetGateway: AssetGateway) {}

  async execute(asset: Asset): Promise<Asset> {
    return this.assetGateway.updateAsset(asset)
  }
}
