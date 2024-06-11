import { revalidatePath } from 'next/cache'


interface Params {
	params: { id: string }
}
export async function PATCH(request: Request, { params }: Params) {
	const id = params.id

	revalidatePath('/', 'layout')

  const backURL = process.env.BACKEND_URL || "http://3.136.23.116:3301";
  
  const data = await fetch(`${backURL}/appointments/close/${id}`, {
    method: "PATCH",
    cache: "no-cache",
  }).then((response) => response.json())

	return Response.json(data)
}
