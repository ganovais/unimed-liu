"use client";

import { useQuery } from "@tanstack/react-query";

import AppointmentCard from "@/components/sistema/AppointmentCard";
import { api } from "@/lib/api";

export default function System() {
  const { data, isLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const response = await api.get(`/appointments`);
      return response.data;
    },
    refetchInterval: 10000,
    retry: 3,
    retryDelay: 1000,
  });

  if (isLoading) return <p>Carregando...</p>;

  return data && data.length > 0 ? (
    <div className="grid grid-cols-12 gap-3">
      {data.map((appointment: any) => (
        <AppointmentCard key={appointment.id} appointment={appointment} />
      ))}
    </div>
  ) : (
    <p className="w-full text-lg font-bold">Nenhum atendimento encontrado</p>
  );
}
