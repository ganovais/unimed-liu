"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { format, parseISO, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

function AppointmentCard({ appointment }: { appointment: typeof mockResponseAppointments[0] }) {
  async function handleCloseAppointment(id: string) {
    const response = await api.patch(`/appointments/close/${id}`);

    if (response.data.error) {
      toast.error(response.data.message);
      return;
    }

    toast.success(response.data.message);
  }

  return (
    <Card className="col-span-full sm:col-span-6 md:col-span-3">
      <CardHeader>
        <CardTitle>Atendimento #{appointment.number}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Nome: {appointment.patient.name} <br />
          Leito: {appointment.unitCode} <br />
          Atendimento: {appointment.alexaServiceId} <br />
          Solicitação: {appointment.alexaServiceName} <br />
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
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => handleCloseAppointment(appointment.id)}>Finalizar Atendimento</Button>
      </CardFooter>
    </Card>
  );
}