import { useGetCompanyById } from '@/hooks/useGetCompanyById'
import { useGetUnitById } from '@/hooks/useGetUnitById'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { fireEvent, render, screen } from '@testing-library/react'
import { UserCard } from '.'

const mockClient = new QueryClient()

jest.mock('@/hooks/useGetUnitById')
jest.mock('@/hooks/useGetCompanyById')

const mockedUseGetUnitById = useGetUnitById as jest.Mock<any>
const mockedUseGetCompanyById = useGetCompanyById as jest.Mock<any>

describe('UserCard component', () => {
  beforeEach(() => {
    mockedUseGetUnitById.mockImplementation(() => ({
      data: {
        id: 1,
        name: 'Unit 1',
        companyId: 1
      }
    }))
    mockedUseGetCompanyById.mockImplementation(() => ({
      data: {
        id: 1,
        name: 'Company 1'
      }
    }))
  })

  it('renders correctly', () => {
    render(
      <QueryClientProvider client={mockClient}>
        <UserCard
          user={{
            companyId: 1,
            email: 'test@gmail.com',
            id: 1,
            name: 'John Doe',
            unitId: 1
          }}
        />
      </QueryClientProvider>
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('test@gmail.com')).toBeInTheDocument()
    expect(screen.getByText('Company 1')).toBeInTheDocument()
    expect(screen.getByText('Unit 1')).toBeInTheDocument()
  })

  it('should callback when clicking on the option button', () => {
    const onClick = jest.fn()

    const { container } = render(
      <QueryClientProvider client={mockClient}>
        <UserCard
          user={{
            companyId: 1,
            email: 'test@gmail.com',
            id: 1,
            name: 'John Doe',
            unitId: 1
          }}
          options={[
            {
              icon: <></>,
              onClick: onClick,
              key: 'test'
            }
          ]}
        />
      </QueryClientProvider>
    )

    const button = container.querySelector('button')

    if (button) {
      fireEvent.click(button)
    }

    expect(onClick).toHaveBeenCalled()
  })
})
