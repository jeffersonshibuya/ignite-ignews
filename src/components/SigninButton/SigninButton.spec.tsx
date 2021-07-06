import { render, screen } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { useSession } from 'next-auth/client'
import { SigninButton } from '.'

jest.mock('next-auth/client')


describe('SigninButton Component', () => {

  it('should renders correctly when user is not authenticated', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValue([null, false]);

    render(
      <SigninButton />
    )

    expect(screen.getByText('Sign In with Github')).toBeInTheDocument();
  })

  it('should renders correctly when user is authenticated', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValue([{
      expires: '1d',
      user: {
        name: 'John Doe'
      }
    }, false]);

    render(
      <SigninButton />
    )

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  })

})