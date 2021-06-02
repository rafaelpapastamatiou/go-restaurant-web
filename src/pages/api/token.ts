import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session || (session && !session.accessToken)) {
    return res.status(401).end();
  }

  return res.status(200).json(session.accessToken);
};
