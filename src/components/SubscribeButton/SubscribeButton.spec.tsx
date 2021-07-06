import { render, screen, fireEvent } from "@testing-library/react"
import { SubscribeButton } from '.'
import { signIn, useSession } from 'next-auth/client'
import { mocked } from "ts-jest/utils"
import { useRouter } from 'next/router'

jest.mock('next-auth/client')

jest.mock('next/router')

describe('SubscribeButton Components', () => {
  const useSessionMoked = mocked(useSession)

  useSessionMoked.mockReturnValueOnce([null, false])

  it('renders correctly', () => {
    render(
      <SubscribeButton />
    )

    expect(screen.getByText('Subscribe now')).toBeInTheDocument()
  })

  it('redirects user to sign in when not authenticated', () => {
    const signInMocked = mocked(signIn)
    const useSessionMoked = mocked(useSession)

    useSessionMoked.mockReturnValueOnce([null, false])

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Subscribe now')

    fireEvent.click(subscribeButton)

    expect(signInMocked).toHaveBeenCalled();
  })

  it('redirects to posts when user already has a subscription', () => {
    const useRouterMoked = mocked(useRouter)
    const useSessionMocked = mocked(useSession)
    const pushMock = jest.fn();

    useSessionMocked.mockReturnValueOnce(
      [
        {
          user: {
            name: 'John Doe',
            email: 'johndoe@email.com'
          },
          activeSubscription: 'fake-active-subscription',
          expires: 'fake-expires'
        },
        false
      ]
    )

    useRouterMoked.mockReturnValueOnce({
      push: pushMock
    } as any)

    render(<SubscribeButton />)

    const subscribeButton = screen.getByText('Subscribe now')

    fireEvent.click(subscribeButton)

    expect(pushMock).toHaveBeenCalledWith('/posts');
  })
})