import { Listener, NotFoundError, Subjects, TicketUpdatedEvent } from "@tvztickets/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
  queueGroupName = 'orders-service';

  async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
    const ticket = await Ticket.findByEvent(data);

    if (!ticket) {
      throw new NotFoundError();
    }

    const { title, price } = data;
    ticket.set({
      title,
      price,
    });

    await ticket.save();

    msg.ack();
  }
}
