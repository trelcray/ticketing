import { Listener, OrderCreatedEvent, Subjects } from "@tvztickets/common";
import { Message } from "node-nats-streaming";
import { expirantionQueue } from "../../queues/expiration-queue";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = 'expirantion-service';

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    await expirantionQueue.add({
      orderId: data.id,
    },
      {
        delay,
      }
    );

    msg.ack();
  }
}