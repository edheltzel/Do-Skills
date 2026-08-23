/**
 * Minimal ambient types for `discord.js` — only the surface used by
 * ../../Lib/discord-bot.ts and ../../Lib/midjourney-client.ts.
 *
 * Those files sit outside Tools/, so a dependency installed into
 * Tools/node_modules would never be found by their resolution chain
 * (Lib/node_modules -> do-art/node_modules -> ...). An ambient module
 * declaration is program-global, so it covers them from here.
 *
 * Classes (not interfaces) so `import { Message } from 'discord.js'`
 * stays a value import under verbatimModuleSyntax.
 *
 * Types only — the package itself is not installed, so the Midjourney
 * path needs `discord.js` added to a package.json above Lib/ to run.
 * Delete this file if that happens: an ambient module declaration shadows
 * the real package's types.
 */
declare module 'discord.js' {
  export class Collection<K, V> extends Map<K, V> {
    first(): V | undefined;
  }

  export enum GatewayIntentBits {
    Guilds,
    GuildMessages,
    MessageContent,
  }

  export enum Partials {
    Message,
    Channel,
  }

  export class Attachment {
    url: string;
  }

  export class Channel {
    isTextBased(): boolean;
  }

  export class Message {
    id: string;
    content: string;
    author: { id: string };
    attachments: Collection<string, Attachment>;
    reference?: { messageId?: string };
    interaction?: { id: string };
  }

  export class TextChannel extends Channel {
    send(content: string): Promise<Message>;
    messages: {
      fetch(options: { limit: number }): Promise<Collection<string, Message>>;
    };
  }

  export interface ClientOptions {
    intents: GatewayIntentBits[];
    partials?: Partials[];
  }

  export class Client {
    constructor(options: ClientOptions);
    user: { tag: string } | null;
    channels: {
      fetch(id: string): Promise<Channel | null>;
    };
    once(event: 'ready', listener: () => void): this;
    on(event: 'error', listener: (error: Error) => void): this;
    login(token: string): Promise<string>;
    destroy(): Promise<void>;
  }
}
