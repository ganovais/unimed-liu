"use client";

import { useQuery } from "@tanstack/react-query";

import AppointmentCard from "@/components/sistema/AppointmentCard";
import { api } from "@/lib/api";

export default function System() {
  const { data, isFetching } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const response = await api.get(`/appointments`);
      return response.data;
    },
    retry: 3,
    retryDelay: 1000
  });

  if (isFetching) return <p>Carregando...</p>;

  return (
    <div className="grid grid-cols-12 gap-3">
      {data && data.length > 0 ? (
        data.map((appointment: any) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))
      ) : (
        <p>Nenhum atendimento encontrado</p>
      )}
    </div>
  );
}