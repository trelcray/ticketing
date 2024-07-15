import { Publisher, OrderCreatedEvent, Subjects } from "@tvztickets/common"; 

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}