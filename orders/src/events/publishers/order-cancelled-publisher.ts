import { Publisher, OrderCancelledEvent, Subjects } from "@tvztickets/common"; 

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}