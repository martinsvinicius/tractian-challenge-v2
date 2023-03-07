import AssetsPage from './page'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useGetAssets } from '@/hooks/useGetAseets'
import { Asset } from '@/core/domain/models/asset'

jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: () => undefined
  }),
  useRouter: () => ({
    push: () => {}
  }),
  usePathname: () => '/'
}))

const mockedUseGetAssets = useGetAssets as jest.Mock<any>

jest.mock('@/hooks/useGetAseets')

const mockQueryClient = new QueryClient()

describe('Assets page', () => {
  beforeEach(() => {
    const mockAssets: Asset[] = [
      {
        id: 1,
        name: 'Asset 1',
        unitId: 1,
        assignedUserIds: [1, 2],
        companyId: 1,
        healthHistory: [],
        healthscore: 70,
        image: '/no-image.png',
        metrics: {
          lastUptimeAt: '2021-09-01T00:00:00.000Z',
          totalCollectsUptime: 100,
          totalUptime: 90
        },
        model: 'Model 1',
        sensors: [],
        specifications: {
          maxTemp: 100,
          power: 100,
          rpm: 100
        },
        status: 'inOperation'
      },
      {
        id: 2,
        name: 'Asset 2',
        unitId: 2,
        assignedUserIds: [1, 2],
        companyId: 1,
        healthHistory: [],
        healthscore: 70,
        image: '/no-image.png',
        metrics: {
          lastUptimeAt: '2021-09-01T00:00:00.000Z',
          totalCollectsUptime: 100,
          totalUptime: 90
        },
        model: 'Model 2',
        sensors: [],
        specifications: {
          maxTemp: 100,
          power: 100,
          rpm: 100
        },
        status: 'inOperation'
      }
    ]
    mockedUseGetAssets.mockImplementation(() => ({
      data: mockAssets
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly', () => {
    const { container } = render(
      <QueryClientProvider client={mockQueryClient}>
        <AssetsPage />
      </QueryClientProvider>
    )

    expect(screen.getByText('Change Unit')).toBeInTheDocument()
    expect(container.querySelector('#select-unit')).toBeInTheDocument()
    expect(screen.getByText('Asset 1')).toBeInTheDocument()
    expect(screen.getByText('Asset 2')).toBeInTheDocument()
  })
})
