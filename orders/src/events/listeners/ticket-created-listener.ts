import { Listener, Subjects, TicketCreatedEvent } from "@tvztickets/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = 'orders-service';

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { id, price, title } = data;
    const ticket = Ticket.build({
      id, title, price
    });

    await ticket.save();

    msg.ack();
  }
}