import { initManager } from "./manager/init.ts";
import { SERVICE_CONFIG } from "./service.config.ts";

export async function init() {
    const config = SERVICE_CONFIG;

    await initManager(config);
}
