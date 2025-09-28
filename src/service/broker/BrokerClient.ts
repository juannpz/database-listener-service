import { IBrokerConfig,  } from "../service.definition.ts";
import { Notification } from "../manager/notificationManager/notificationManager.definition.ts";
import { Kafka, PartitionerArgs, Producer } from "@kafka";


export class BrokerClient {
    private client: Kafka | null = null;
    private producer: Producer | null = null;
	private config: IBrokerConfig;

    public constructor(config: IBrokerConfig) {
		this.config = config;
	}

    public async init() {
        this.client = new Kafka({
            brokers: [`${this.config.BROKER_HOST}:${this.config.BROKER_PORT}`],
            clientId: this.config.BROKER_CLIENT_ID,
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

    public async sendMessage(payload: Notification) {
        if (!this.producer)
            throw new Error("Broker producer not initialized");

        await this.producer.send({
            topic: payload.table,
            messages: [
                { value: JSON.stringify(payload) }
            ]
        });
    }

    private createPartitioner() {
        return (_args: PartitionerArgs) => {
            return 0;
        }
    }
}