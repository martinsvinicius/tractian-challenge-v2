import {
  AssetGateway,
  GetAssetsParams
} from '@/core/domain/gateways/asset.gateway'

export type GetAssetsUseCaseParams = GetAssetsParams

export class GetAssetsUseCase {
  constructor(private assetGateway: AssetGateway) {}

  execute(params?: GetAssetsUseCaseParams) {
    return this.assetGateway.getAssets(params)
  }
}
