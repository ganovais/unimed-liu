import { cookies } from "next/headers"

export function POST() {
	cookies().delete('unimed@auth')

	return Response.json({ error: false })
}
