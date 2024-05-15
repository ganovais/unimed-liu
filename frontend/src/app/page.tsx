"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UnimedLogo from "../assets/logo.png";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Informe um e-mail válido" }),
  sector: z.string(),
  password: z
    .string()
    .min(8, { message: "Sua senha deve ter pelo menos 8 caracteres" }),
});

type LoginData = z.infer<typeof loginFormSchema>;

export default function Login() {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginData>({
    mode: "onSubmit",
    resolver: zodResolver(loginFormSchema),
  });

  async function onSubmit(formData: LoginData) {
    localStorage.setItem("sector", formData.sector);
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    if (data.error) {
      toast.warning("E-mail ou senha inválidos");
      return;
    }

    toast.success("Login realizado com sucesso");
    router.push("/sistema");
  }

  return (
    <div className="flex flex-col gap-5 mx-auto w-full max-w-md h-screen items-center justify-center">
      <Image
        className="mb-16"
        quality={60}
        width={300}
        height={300}
        alt="Logo Unimed"
        src={UnimedLogo}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className="flex flex-col gap-5 w-96"
      >
        <div className="grid items-center gap-1.5">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            error={errors?.email}
          />
        </div>

        <div className="grid items-center gap-1.5">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            error={errors?.password}
          />
        </div>

        <div className="grid items-center gap-1.5">
          <Label htmlFor="email">Setor</Label>
          <select {...register('sector')}>
            <option value="nursing">Enfermagem</option>
            <option value="nutrition">Nutrição</option>
            <option value="hospitality">Hotelaria</option>
          </select>
        </div>

        <Button type="submit">Entrar</Button>
      </form>
    </div>
  );
}
