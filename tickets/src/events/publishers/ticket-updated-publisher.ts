import { Publisher, Subjects, TicketUpdatedEvent } from "@tvztickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
};