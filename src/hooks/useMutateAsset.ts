import { UpdateAssetUseCase } from '@/core/application/assets/update-asset.use-case'
import { Asset } from '@/core/domain/models/asset'
import { container, ContainerRegistry } from '@/core/infra/container'
import { useMutation } from '@tanstack/react-query'

const useCase = container.get<UpdateAssetUseCase>(
  ContainerRegistry.UpdateAssetUseCase
)

export const useMutateAsset = () => {
  return useMutation((asset: Asset) => useCase.execute(asset))
}
