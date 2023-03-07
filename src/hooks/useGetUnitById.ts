import { FindUnitByIdUseCase } from '@/core/application/units/find-unit-by-ud.use-case'
import { container, ContainerRegistry } from '@/core/infra/container'
import { useQuery } from '@tanstack/react-query'

const useCase = container.get<FindUnitByIdUseCase>(
  ContainerRegistry.FindUnitByIdUseCase
)

export const useGetUnitById = (id: number) => {
  return useQuery(['unit', id], () => useCase.execute(id))
}
