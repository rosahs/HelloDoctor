import type { NextApiRequest, NextApiResponse } from 'next'

type Doctor = {
    id: string
    name: string
    title: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Doctor | { message: string }>
) {
    const { id } = req.query

    
    const doctor: Doctor = {
        id: id as string,
        name: "Dr. Razha",
        title: "M.D.",
    }

    if (req.method === 'GET') {
        res.status(200).json(doctor)
    } else {
        res.status(405).json({ message: 'Method Not Allowed' })
    }
}
