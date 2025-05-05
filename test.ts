import { Kafka } from "npm:kafkajs";

const client = new Kafka({
    brokers: ["localhost:5000"],
    clientId: "test-app"
})

const consumer = client.consumer({ groupId: "test-group" });

await consumer.subscribe({
    topics: ["user_credentials"],
    fromBeginning: true
})

export function runConsumer() {
    consumer.run({
        eachMessage: async (message) => {
            if (message.message.value){
                console.log("Got notification from broker");
                console.log(JSON.parse(message.message.value?.toString()));
            }
        }
    })
}