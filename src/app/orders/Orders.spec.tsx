import WorkOrdersPage from './page'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { useGetWorkOrders } from '@/hooks/useGetWorkOrders'
import { WorkOrder } from '@/core/domain/models/work-order'

jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: () => undefined
  }),
  useRouter: () => ({
    push: () => {}
  }),
  usePathname: () => '/'
}))

jest.mock('@/hooks/useGetWorkOrders')

const mockedUseGetWorkOrders = useGetWorkOrders as jest.Mock<any>

const mockQueryClient = new QueryClient()

describe('Work Orders page', () => {
  beforeEach(() => {
    const mockData: WorkOrder[] = [
      {
        assetId: 1,
        assignedUserIds: [1, 2],
        checklist: [
          {
            completed: true,
            task: 'Task 1'
          }
        ],
        description: 'Description 1',
        id: 1,
        priority: 'low',
        status: 'completed',
        title: 'Title 1'
      },
      {
        assetId: 2,
        assignedUserIds: [1, 2],
        checklist: [
          {
            completed: true,
            task: 'Task 2'
          }
        ],
        description: 'Description 2',
        id: 2,
        priority: 'low',
        status: 'completed',
        title: 'Title 2'
      }
    ]
    mockedUseGetWorkOrders.mockImplementation(() => ({
      data: mockData
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders correctly', () => {
    const { container } = render(
      <QueryClientProvider client={mockQueryClient}>
        <WorkOrdersPage />
      </QueryClientProvider>
    )

    expect(screen.getByText('Change Asset')).toBeInTheDocument()
    expect(container.querySelector('#select-asset')).toBeInTheDocument()
    expect(screen.getByText('Title 1')).toBeInTheDocument()
    expect(screen.getByText('Title 2')).toBeInTheDocument()
  })
})
