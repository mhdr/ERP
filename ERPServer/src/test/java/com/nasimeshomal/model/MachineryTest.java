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


        Machinery machinery7=new Machinery(Machinery.MachineryType.Unit,true);
        machinery7.unit.unitNameFa="انبار";
        machinery7.unit.unitNameEn="Warehouse";
        mongoOperation.insert(machinery7);

        Machinery machinery8=new Machinery(Machinery.MachineryType.Unit,machinery7.id);
        machinery8.unit.unitNameFa="انبار محصول";
        machinery8.unit.unitNameEn="Production Warehouse";
        mongoOperation.insert(machinery8);

        Machinery machinery9=new Machinery(Machinery.MachineryType.Unit,machinery7.id);
        machinery9.unit.unitNameFa="انبار مواد اولیه";
        machinery9.unit.unitNameEn="Material Warehouse";
        mongoOperation.insert(machinery9);

        Machinery machinery10=new Machinery(Machinery.MachineryType.Machine,machinery8.id);
        machinery10.machine.machineNameEn="Production Cold Room";
        machinery10.machine.pmCode="Cold-4532";
        machinery10.machine.machineNameFa="سردخانه محصول";
        mongoOperation.insert(machinery10);

        Machinery machinery11=new Machinery(Machinery.MachineryType.Machine,machinery9.id);
        machinery11.machine.machineNameEn="Material Cold Room";
        machinery11.machine.pmCode="Cold-4533";
        machinery11.machine.machineNameFa="سردخانه مواد اولیه";
        mongoOperation.insert(machinery11);
    }
}
