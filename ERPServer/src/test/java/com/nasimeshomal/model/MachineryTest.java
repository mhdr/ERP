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

        Machinery machinery1=new Machinery(Machinery.MachineryType.Unit,true);
        machinery1.unit.unitNameFa="تولید";
        machinery1.unit.unitNameEn="Production";
        mongoOperation.insert(machinery1);

        Machinery machinery2=new Machinery(Machinery.MachineryType.Unit,machinery1.id);
        machinery2.unit.unitNameFa="مایعات";
        machinery2.unit.unitNameEn="Liquid";
        mongoOperation.insert(machinery2);

        Machinery machinery3=new Machinery(Machinery.MachineryType.Unit,machinery1.id);
        machinery3.unit.unitNameFa="جامدات";
        machinery3.unit.unitNameEn="Solid";
        mongoOperation.insert(machinery3);

        Machinery machinery4=new Machinery(Machinery.MachineryType.Machine,machinery2.id);
        machinery4.machine.machineNameEn="Filling Isolator";
        machinery4.machine.pmCode="ISO-7651";
        machinery4.machine.machineNameFa="ایزولاتور فیلینگ";
        mongoOperation.insert(machinery4);

        Machinery machinery5=new Machinery(Machinery.MachineryType.Machine,machinery3.id);
        machinery5.machine.machineNameEn="Capsule Filling";
        machinery5.machine.pmCode="CAP-1100";
        machinery5.machine.machineNameFa="کپسول فیلینگ";
        mongoOperation.insert(machinery5);

        Machinery machinery6=new Machinery(Machinery.MachineryType.Machine,machinery2.id);
        machinery6.machine.machineNameEn="Vial Washing";
        machinery6.machine.pmCode="VIL-9867";
        machinery6.machine.machineNameFa="شستشو ویال";
        mongoOperation.insert(machinery6);
    }
}
