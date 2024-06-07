"use client";

import { useQuery } from "@tanstack/react-query";

import AppointmentCard from "@/components/sistema/AppointmentCard";
import { mockResponseAppointments } from "@/mock-response-appointments";

export default function System() {
  const sector = localStorage.getItem("sector");
  const { data, isFetching } = useQuery({
    queryKey: ["appointments", sector],
    queryFn: async () => {
      // const response = await api.get(`/appointments/${sector}`);
      // return response.data;

      return mockResponseAppointments;
    },
  });

  if (isFetching) return <p>Carregando...</p>;

  return (
    <div className="grid grid-cols-12 gap-3">
      {data && data.length > 0 ? (
        data.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))
      ) : (
        <p>Nenhum atendimento encontrado</p>
      )}
    </div>
  );
}