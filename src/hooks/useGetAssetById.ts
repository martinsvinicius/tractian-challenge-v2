import { FindAssetByIdUseCase } from '@/core/application/assets/find-asset-by-id.use-case'
import { container, ContainerRegistry } from '@/core/infra/container'
import { useQuery } from '@tanstack/react-query'

const useCase = container.get<FindAssetByIdUseCase>(
  ContainerRegistry.FindAssetByIdUseCase
)

export const useGetAssetById = (id: number) => {
  return useQuery(['asset', id], () => useCase.execute(id))
}
