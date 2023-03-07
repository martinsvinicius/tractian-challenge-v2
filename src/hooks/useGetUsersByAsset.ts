import { GetUsersByAssetUseCase } from '@/core/application/users/get-users-by-asset.use-case'
import { Asset } from '@/core/domain/models/asset'
import { container, ContainerRegistry } from '@/core/infra/container'
import { useQuery } from '@tanstack/react-query'

const useCase = container.get<GetUsersByAssetUseCase>(
  ContainerRegistry.GetUsersByAssetUseCase
)

export const useGetUsersByAsset = (asset: Asset) => {
  return useQuery(['users', asset.id], () => useCase.execute(asset))
}
