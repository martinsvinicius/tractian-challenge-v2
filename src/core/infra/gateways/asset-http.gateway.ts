import {
  AssetGateway,
  GetAssetsParams
} from '@/core/domain/gateways/asset.gateway'
import { Asset } from '@/core/domain/models/asset'
import { AxiosInstance } from 'axios'

export class AssetHttpGateway implements AssetGateway {
  constructor(private http: AxiosInstance) {}

  async getAssets(params?: GetAssetsParams): Promise<Asset[]> {
    const { data } = await this.http.get<Asset[]>('/assets', {
      params
    })

    return data
  }

  async updateAsset(asset: Asset): Promise<Asset> {
    const { id, ...rest } = asset

    const { data } = await this.http.put<Asset>(`/assets/${id}`, rest)

    return data
  }

  async findAssetById(id: number): Promise<Asset> {
    const { data } = await this.http.get<Asset>(`/assets/${id}`)

    return data
  }
}
