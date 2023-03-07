import { Asset } from '../models/asset'

export interface GetAssetsParams {
  unitId?: number
}

export interface AssetGateway {
  getAssets(params?: GetAssetsParams): Promise<Asset[]>
  findAssetById(id: number): Promise<Asset>
  updateAsset(asset: Asset): Promise<Asset>
}
