"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { format, parseISO, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { api } from "@/lib/api";
import { mockResponseAppointments } from "@/mock-response-appointments";

export default function System() {
  const sector = localStorage.getItem("sector");

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["appointments", sector],
    queryFn: async () => {
      // const response = await api.get(`/appointments/${sector}`);
      // return response.data;

      return mockResponseAppointments;
    },
  });

  if (isFetching) return <p>Loading...</p>;

  async function handleCloseAppointment(id: string) {
    const response = await api.patch(`/appointments/close/${id}`);

    if (response.data.error) {
      toast.error(response.data.message);
      return;
    }

    toast.success(response.data.message);
    refetch();
  }

  return (
    <div className="grid grid-cols-12 gap-3">
      {data && data.length > 0 ? (
        data.map((appointment) => (
          <Card
            key={appointment.id}
            className="col-span-full sm:col-span-6 md:col-span-3"
          >
            <CardHeader>
              <CardTitle>Atendimento #</CardTitle>
            </CardHeader>
            <CardContent>
              Nome: {appointment.patient.name}
              <br />
              Leito: {appointment.unitCode} <br />
              Atendimento:{appointment.alexaServiceId} <br />
              Solicitação: {appointment.alexaServiceName}
              <br />
              Horário:{" "}
              {format(parseISO(appointment.createdAt), "dd/MM, HH:mm", {
                locale: ptBR,
              })}
              (
              {formatDistanceToNow(parseISO(appointment.createdAt), {
                addSuffix: true,
                locale: ptBR,
              })}
              )<br />
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        ))
      ) : (
        <p>Nenhum atendimento encontrado</p>
      )}
    </div>
  );
}
