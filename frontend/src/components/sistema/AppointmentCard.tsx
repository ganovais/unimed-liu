import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { CardTitle } from "@/components/ui/card-title";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ModalContainer, ModalContent, ModalHeader, ModalText, ModalButton } from "@/components/ui/modal";
import { format, parseISO, formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { mockResponseAppointments } from "@/mock-response-appointments";

export default function AppointmentCard({ appointment }: { appointment: typeof mockResponseAppointments[0] }) {
  const [visible, setVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFinishAppointment = () => {
    setVisible(false);
    setIsModalOpen(false);
  };

  return (
    <>
      {visible && (
        <Card className="col-span-full sm:col-span-6 md:col-span-3">
          <CardHeader>
            <CardTitle createdAt={appointment.createdAt}>Atendimento #{appointment.number}</CardTitle>
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
              <ModalButton onClick={handleFinishAppointment} className="ml-4">Confirmar</ModalButton>
            </div>
          </ModalContent>
        </ModalContainer>
      )}
    </>
  );
}
