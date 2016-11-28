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

        Machinery machinery1=new Machinery(Machinery.MachineryType.Unit);
        machinery1.unit.unitNameFa="تولید";
        mongoOperation.insert(machinery1);

        Machinery machinery2=new Machinery(Machinery.MachineryType.Unit,machinery1.id);
        machinery2.unit.unitNameFa="مایعات";
        mongoOperation.insert(machinery2);

        Machinery machinery3=new Machinery(Machinery.MachineryType.Unit,machinery1.id);
        machinery3.unit.unitNameFa="جامدات";
        mongoOperation.insert(machinery3);

        Machinery machinery4=new Machinery(Machinery.MachineryType.Machine,machinery2.id);
        machinery4.machine.machineNameEn="Filling Isolator";
        machinery4.machine.pmCode="ISO-7651";
        mongoOperation.insert(machinery4);
    }
}
