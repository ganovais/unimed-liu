"use client";

import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { api } from "@/lib/api";


export default function System() {
  const sector = localStorage.getItem("sector");

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["appointments", sector],
    queryFn: async () => {
      const response = await api.get(`/appointments/${sector}`);
      return response.data;
    },
  });

  if (isFetching) return <p>Loading...</p>;

  async function handleCloseAppointment(id: string) {
    const response = await api.patch(`/appointments/close/${id}`);

    if(response.data.error) {
      toast.error(response.data.message);
      return 
    }

    toast.success(response.data.message);
    refetch()
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
              <button onClick={() => handleCloseAppointment(appointment.id)}>close</button>
              <CardTitle>{appointment.patient.name}</CardTitle>
              <CardDescription>
                Serviço solicitado: {appointment.alexaServiceName}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        ))
      ) : (
        <p>Nenhum atendimento encontrado</p>
      )}
    </div>
  );
}
