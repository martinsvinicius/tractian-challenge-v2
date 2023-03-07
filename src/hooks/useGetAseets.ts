import {
  GetAssetsUseCase,
  GetAssetsUseCaseParams
} from '@/core/application/assets/get-assets.use-case'
import { container, ContainerRegistry } from '@/core/infra/container'
import { useQuery } from '@tanstack/react-query'

const useCase = container.get<GetAssetsUseCase>(
  ContainerRegistry.GetAssetsUseCase
)

export const useGetAssets = (params?: GetAssetsUseCaseParams) => {
  const paramsValues = params ? Object.values(params) : []

  return useQuery(['assets', ...paramsValues], () => useCase.execute(params))
}
