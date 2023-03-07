import { GetUnitsUseCase } from '@/core/application/units/get-units.use-case'
import { container, ContainerRegistry } from '@/core/infra/container'
import { useQuery } from '@tanstack/react-query'

const useCase = container.get<GetUnitsUseCase>(
  ContainerRegistry.GetUnitsUseCase
)

export const useGetUnits = () => {
  return useQuery(['units'], () => useCase.execute())
}
