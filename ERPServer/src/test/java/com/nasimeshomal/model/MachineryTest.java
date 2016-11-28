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

        Machinery.Unit unit2=new Machinery.Unit();
        unit2.unitNameFa="مایعات";

        Machinery.Unit unit3=new Machinery.Unit();
        unit3.unitNameFa="جامدات";

        Machinery.Machine machine1=new Machinery.Machine();
        machine1.machineNameEn="Filling Isolator";
        machine1.pmCode="ISO-7789";
        unit2.addMachine(machine1);

        Machinery machinery=new Machinery();
        machinery.unitNameFa="تولید";
        machinery.addUnit(unit2);
        machinery.addUnit(unit3);

        mongoOperation.insert(machinery);
    }
}
