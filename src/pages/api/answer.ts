import type { NextApiRequest, NextApiResponse } from 'next'
import type { Test } from '../../interfaces'

// Fake users data
const tests: Test[] = [{ title: '2022模拟真题' }, { title: '2021模拟真题' } ]

export default function handler(
    _req: NextApiRequest,
    res: NextApiResponse<Test[]>
) {
    // Get data from your database
    res.status(200).json(tests)
}
