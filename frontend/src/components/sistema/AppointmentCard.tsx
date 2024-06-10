import { useState } from "react";
import { format, parseISO, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card-title";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalText,
  ModalButton,
} from "@/components/ui/modal";
import { api } from "@/lib/api";


export default function AppointmentCard({ appointment }: { appointment: any }) {
  const [visible, setVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  async function handleFinishAppointment() {
    const { data } = await api.patch(`/appointments/close/${appointment.id}`);

    if (data.error) {
      toast.error("Erro ao finalizar atendimento");
      return;
    }

    toast.success(data.message);
    setVisible(false);
    setIsModalOpen(false);
  }

  return (
    <>
      {visible && (
        <Card className="col-span-full sm:col-span-6 md:col-span-3">
          <CardHeader>
            <CardTitle createdAt={appointment.createdAt}>
              Atendimento #{appointment.number}
            </CardTitle>
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
            <Button onClick={openModal}>Finalizar Atendimento</Button>
          </CardFooter>
        </Card>
      )}
      {isModalOpen && (
        <ModalContainer>
          <ModalContent>
            <ModalHeader>
              <ModalText>Confirmação de Exclusão</ModalText>
            </ModalHeader>
            <Label>Deseja realmente excluir este item?</Label>
            <div className="flex justify-end mt-6">
              <ModalButton onClick={closeModal}>Cancelar</ModalButton>
              <ModalButton onClick={handleFinishAppointment} className="ml-4">
                Confirmar
              </ModalButton>
            </div>
          </ModalContent>
        </ModalContainer>
      )}
    </>
  );
}
