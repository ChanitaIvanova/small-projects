package com.kafka.producer.app;

import com.kafka.producer.services.ProducerService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class Application {
    public static void main(String[] args) throws InterruptedException {
        ProducerService producerService = new ProducerService();
        producerService.sendMessage("test", "key", "value");
        log.info("Waiting for 1000ms");

        Thread.sleep(1000);

        log.info("Sending message");

        producerService.sendMessage("test", "key-2", "value -2");

        log.info("Message sent");
    }
}