import { get } from "lodash";

export async function POST(request: Request) {
  const body = await request.json();
  const email = get(body, "email", "");
  const password = get(body, "password", "");

  let error = false
  if(email !== 'admin@unimed.com' || password !== 'admin_123') {
    error = true
  }

  return Response.json({ error });
}
