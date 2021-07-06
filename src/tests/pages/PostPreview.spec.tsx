import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/client'
import { mocked } from 'ts-jest/utils'

import Post, { getStaticProps } from '../../pages/posts/preview/[slug]'
import { useRouter } from 'next/router'
import { getPrismicClient } from '../../services/prismic'

jest.mock('next/router')
jest.mock('next-auth/client')
jest.mock('../../services/prismic')

const post = {
  slug: 'my-new-post',
  title: 'My new post',
  content: '<p>Post excerpt </p>',
  updatedAt: 'Jun, 6'
}

describe('Post preview page', () => {
  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render(<Post post={post} />)

    expect(screen.getByText('My new post')).toBeInTheDocument()
    expect(screen.getByText('Post excerpt')).toBeInTheDocument()
    expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument()
  })

  it('redirects user to full post when user is is subscribed ', async () => {
    const getSessionMocked = mocked(useSession)
    const routerMocked = mocked(useRouter)
    const pushMock = jest.fn();

    getSessionMocked.mockReturnValueOnce([
      { activeSubscription: 'fake-active-subscription' }, false
    ] as any)

    routerMocked.mockReturnValueOnce({
      push: pushMock
    } as any)

    render(<Post post={post} />)

    expect(pushMock).toHaveBeenCalledWith(`/posts/my-new-post`)
  })

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [{ type: 'heading', text: 'My new post' }],
          content: [{ type: 'paragraph', text: 'Post content' }],
        },
        last_publication_date: '07-6-2021'
      })
    } as any)

    const response = await getStaticProps({
      params: { slug: 'my-new-post' }
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'My new post',
            content: '<p>Post content</p>',
            updatedAt: '06 de julho de 2021'
          }
        }
      })
    )

  })



})