import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  const auth = JSON.parse(cookieStore.get("unimed@auth")?.value || "{}");
  const sector = auth?.sector || "nursing";
  const backURL = process.env.BACKEND_URL || "http://3.136.23.116:3301";
  
  const data = await fetch(`${backURL}/appointments/${sector}`, {
    cache: "no-cache",
  }).then((response) => response.json())

	return Response.json(data);
}
