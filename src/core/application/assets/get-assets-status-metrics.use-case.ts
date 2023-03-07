import { AssetGateway } from '@/core/domain/gateways/asset.gateway'

export class GetAssetsStatusMetricsUseCase {
  constructor(private assetGateway: AssetGateway) {}

  async execute() {
    const assets = await this.assetGateway.getAssets()

    return {
      total: assets.length,
      inAlert: assets.filter((asset) => asset.status === 'inAlert').length,
      inOperation: assets.filter((asset) => asset.status === 'inOperation')
        .length,
      inDowntime: assets.filter((asset) => asset.status === 'inDowntime').length
    }
  }
}
