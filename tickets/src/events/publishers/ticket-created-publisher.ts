import { Publisher, Subjects, TicketCreatedEvent } from "@tvztickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
};