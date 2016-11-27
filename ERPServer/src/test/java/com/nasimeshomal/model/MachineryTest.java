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

        Machinery.Unit unit1=new Machinery.Unit();
        unit1.unitNameFa="تولید";

        Machinery.Unit unit2=new Machinery.Unit();
        unit2.unitNameFa="مایعات";

        Machinery.Unit unit3=new Machinery.Unit();
        unit3.unitNameFa="جامدات";

        Machinery.Machine machine1=new Machinery.Machine();
        machine1.machineNameEn="Filling Isolator";
        machine1.pmCode="ISO-7789";
        unit2.addMachine(machine1);

        unit1.addUnit(unit2);
        unit1.addUnit(unit3);

        Machinery machinery=new Machinery();
        machinery.unit=unit1;

        mongoOperation.insert(machinery);
    }
}
