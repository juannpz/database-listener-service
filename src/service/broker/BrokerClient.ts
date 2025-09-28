import { IBrokerConfig,  } from "../service.definition.ts";
import { Notification } from "../manager/notificationManager/notificationManager.definition.ts";
import { Kafka, PartitionerArgs, Producer } from "@kafka";


export class BrokerClient {
    private static client: Kafka | null = null;
    private static producer: Producer | null = null;

    private constructor() { }

    public static async init(config: IBrokerConfig) {
        this.client = new Kafka({
            brokers: [`${config.BROKER_HOST}:${config.BROKER_PORT}`],
            clientId: config.BROKER_CLIENT_ID,
			retry: {
				initialRetryTime: 300,
				retries: 10
			}
        });

        this.producer = this.client.producer({
            createPartitioner: this.createPartitioner
        });

        await this.producer.connect();
        
        console.log("Broker client initialized");
    }

    public static async sendMessage(payload: Notification) {
        if (!this.producer)
            throw new Error("Broker producer not initialized");

        await this.producer.send({
            topic: payload.table,
            messages: [
                { value: JSON.stringify(payload) }
            ]
        });
    }

    private static createPartitioner() {
        return (args: PartitionerArgs) => {
            return 0;
        }
    }
}