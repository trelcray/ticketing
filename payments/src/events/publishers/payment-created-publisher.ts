import { PaymentCreatedEvent, Publisher, Subjects } from "@tvztickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
   readonly subject = Subjects.PaymentCreated;
}