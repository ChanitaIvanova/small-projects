package com.kafka.consumer.app;

import com.kafka.consumer.services.ConsumerService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class Application {
    public static void main(String[] args) throws InterruptedException {

        ConsumerService consumerService = new ConsumerService();
        consumerService.subscribe("test");
        consumerService.consume();
    }
}