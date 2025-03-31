import type { Server } from 'bun';

export declare function setServer(s: Server): void;
export declare function handleHMR(request: Request): Promise<Response>;