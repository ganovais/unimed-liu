import { get, omit } from "lodash";
import { cookies } from "next/headers";

const users = {
  "enfermagem@unimed.com.br": { user: "Enfermagem", sector: "nursing", password: "enfermagem@unimed_" },
  "nutricao@unimed.com.br": { user: "Nutrição", sector: "nutrition", password: "nutricao@unimed_" },
  "hotelaria@unimed.com.br": { user: "Hotelaria", sector: "hospitality", password: "hotelaria@unimed_" },
  "unir@unimed.com.br": { user: "Unir", sector: "unir", password: "unir@unimed_" },
};

type UserEmails = keyof typeof users;

export async function POST(request: Request) {
  const cookieStore = cookies();
  const body = await request.json();
  const email: UserEmails = get(body, "email", "");
  const password = get(body, "password", "");

  const userConfig = users[email];

  if (userConfig && password === userConfig.password) {
    const userConfigWithoutPassword = omit(userConfig, "password");
    cookieStore.set("unimed@auth", JSON.stringify(userConfigWithoutPassword));
    return Response.json({ error: false });
  } else {
    return Response.json({ error: true });
  }
}
