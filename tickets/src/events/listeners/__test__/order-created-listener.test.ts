import { OrderCreatedEvent, OrderStatus } from "@tvztickets/common";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper"
import { OrderCreatedListener } from "../order-created-listener"
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";

const setup = async () => {
  // create an instance of the listener
  const listener = new OrderCreatedListener(natsWrapper.client);

  // create and save a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 99,
    userId: 'asdf'
  })
  await ticket.save();

  // create the fake data event
  const data: OrderCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: 'asdf',
    expiresAt: '23123123',
    ticket: {
      id: ticket.id,
      price: 99
    }
  };
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, ticket, msg };
};

it('sets the userId of the ticket', async () => {
  const { listener, data, ticket, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).toEqual(data.id);
});

it('acks the message', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});

it('publishes a ticket updated event', async () => {
  const { listener, data, msg } = await setup();

  await listener.onMessage(data, msg);

  expect(natsWrapper.client.publish).toHaveBeenCalled();

  const ticketUpdatedData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  );

  expect(data.id).toEqual(ticketUpdatedData.orderId);
});