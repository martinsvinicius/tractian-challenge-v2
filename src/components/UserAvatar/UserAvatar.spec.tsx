import { render, screen } from '@testing-library/react'
import { UserAvatar } from '.'

describe('UserAvatar component', () => {
  it('renders correctly', () => {
    render(
      <UserAvatar
        user={{
          companyId: 1,
          email: 'test@gmail.com',
          id: 1,
          name: 'John Doe',
          unitId: 1
        }}
      />
    )

    expect(screen.getByText('JD')).toBeInTheDocument()
  })
})
