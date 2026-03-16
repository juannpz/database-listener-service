import { Notification } from "../manager/notificationManager/notificationManager.definition.ts";
import { BrokerConfig } from "../service.definition.ts";
import { Admin, Kafka, PartitionerArgs, Producer } from "@kafka";

export class BrokerClient {
    private client: Kafka | null = null;
    private producer: Producer | null = null;
    private config: BrokerConfig;

    public constructor(config: BrokerConfig) {
        this.config = config;
    }

    public async init() {
        this.client = new Kafka({
            brokers: [`${this.config.BROKER_HOST}:${this.config.BROKER_PORT}`],
            clientId: this.config.BROKER_CLIENT_ID,
            retry: {
                initialRetryTime: 300,
                retries: 10,
            },
        });

        this.producer = this.client.producer({
            createPartitioner: this.createPartitioner,
        });

        await this.producer.connect();

        console.log("Broker client initialized");
    }

    public async createTopics(topicsToCreate: string[]) {
        if (!this.client) throw new Error("Kafka client not initialized");

        const admin: Admin = this.client.admin();
        await admin.connect();

        try {
            // Obtenemos los topics que ya existen en el broker
            const existingTopics = await admin.listTopics();

            // Filtramos solo los que faltan crear
            const newTopics = topicsToCreate.filter((t) => !existingTopics.includes(t));

            if (newTopics.length > 0) {
                console.log(`Creating missing Kafka topics: ${newTopics.join(", ")}`);

                await admin.createTopics({
                    topics: newTopics.map((topic) => ({
                        topic: topic,
                        numPartitions: 1, // Ajustable según tus necesidades de escalabilidad
                        replicationFactor: 1, // 1 está perfecto para entorno local
                    })),
                    waitForLeaders: true,
                });
            } else {
                console.log("All Kafka topics are already set up.");
            }
        } catch (error) {
            console.error("Error setting up Kafka topics:", error);
        } finally {
            // Siempre desconectamos el admin cuando termina su trabajo
            await admin.disconnect();
        }
    }

    public async sendMessage(payload: Notification) {
        if (!this.producer) {
            throw new Error("Broker producer not initialized");
        }

        await this.producer.send({
            topic: payload.table,
            messages: [
                { value: JSON.stringify(payload) },
            ],
        });
    }

    private createPartitioner() {
        return (_args: PartitionerArgs) => {
            return 0;
        };
    }
}
