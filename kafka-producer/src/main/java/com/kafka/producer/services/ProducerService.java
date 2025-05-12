package com.kafka.producer.services;

import java.util.Properties;
import java.util.UUID;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;

public class ProducerService {
    private final KafkaProducer<String, String> producer;

    public ProducerService() {
        Properties props = new Properties();
        props.put("bootstrap.servers", "localhost:9092");
        props.put("acks", "all");
        // props.put("retries", 5); // Number of retry attempts
        // props.put("retry.backoff.ms", 300);
        props.put("enable.idempotence", "true");
        props.put("transactional.id", UUID.randomUUID().toString());
        props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        producer = new KafkaProducer<>(props);
        producer.initTransactions();
    }

    public void sendMessage(String topic, String key, String value) {
        ProducerRecord<String, String> record = new ProducerRecord<>(topic, key, value);
        producer.beginTransaction();
        producer.send(record, (metadata, exception) -> {
            if (exception != null) {
                exception.printStackTrace();
            } else {
                System.out.println("Sent to " + metadata.topic() + " partition " +
                        metadata.partition());
            }
        });
        producer.commitTransaction();
    }

}
