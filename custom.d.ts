import { Bot } from "mineflayer"

declare module "mineflayer" {
    export interface Bot {
        dashboard: {
            log(message: string): void
            commands: Record<string, (...args: string[]) => void>
        }
    }
}