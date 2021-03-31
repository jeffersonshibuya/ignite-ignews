import { NextApiRequest, NextApiResponse } from 'next'


export default (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    {name: 'user 01'}
  ]

  return response.json(users)
}

