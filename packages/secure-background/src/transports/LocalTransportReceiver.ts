import {
  CHANNEL_SECURE_BACKGROUND_EXTENSION_REQUEST,
  CHANNEL_SECURE_BACKGROUND_EXTENSION_RESPONSE,
} from "@coral-xyz/common";
import { TransportResponder } from "@coral-xyz/secure-background/clients";
import type {
  SECURE_EVENTS,
  SecureRequest,
  TransportHandler,
  TransportReceiver,
} from "@coral-xyz/secure-background/types";
import type EventEmitter from "eventemitter3";

export class LocalTransportReceiver<
  T extends SECURE_EVENTS = SECURE_EVENTS,
  R extends "response" | "confirmation" = "response"
> implements TransportReceiver<T, R>
{
  private channels: { request: string; response: string } = {
    request: "LOCAL_BACKGROUND_REQUEST",
    response: "LOCAL_BACKGROND_RESPONSE",
  };

  constructor(
    private emitter: EventEmitter,
    channels?: { request: string; response: string }
  ) {
    if (channels) {
      this.channels = channels;
    }
  }

  public setHandler = (handler: TransportHandler<T, R>) => {
    const listener = async (message: SecureRequest<T>) => {
      new TransportResponder<T, R>({
        request: message,
        handler,
        onResponse: (response) => {
          this.emitter.emit(this.channels.response, response);
        },
      });
    };
    this.emitter.addListener(this.channels.request, listener);
    return () => {
      this.emitter.removeListener(this.channels.request, listener);
    };
  };
}
