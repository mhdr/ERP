package com.nasimeshomal.model;

import com.nasimeshomal.config.MongoConfig;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.data.mongodb.core.MongoOperations;

public class MachineryTest {

    @Test
    public void insert01() throws Exception
    {
        ApplicationContext ctx =
                new AnnotationConfigApplicationContext(MongoConfig.class);
        MongoOperations mongoOperation = (MongoOperations) ctx.getBean("mongoTemplate");

        Machinery machinery=new Machinery();
        machinery.unitNameFa="مایعات";
        mongoOperation.insert(machinery);
    }

    @Test
    public void insert02() throws Exception
    {
        ApplicationContext ctx =
                new AnnotationConfigApplicationContext(MongoConfig.class);
        MongoOperations mongoOperation = (MongoOperations) ctx.getBean("mongoTemplate");

        Machinery machinery=new Machinery();
        machinery.unitNameFa="جامدات";
        machinery.unitNameEn="Solid";

        Machinery.Machine machine=new Machinery.Machine();
        machine.machineNameEn="Capsule Filling";
        machine.machineNameFa="کپسول پرکنی";
        machine.pmCode="CAP-6956";
        machinery.addMachine(machine);
        mongoOperation.insert(machinery);
    }
}
