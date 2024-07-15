import { ExpirationCompleteEvent, Publisher, Subjects } from "@tvztickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}