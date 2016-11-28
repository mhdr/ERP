package com.nasimeshomal.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Objects;
import java.util.UUID;

@Document(collection = "machinery")
public class Machinery {

    @Id
    public String id;
    public String unitNameFa;
    public String unitNameEn;

    public ArrayList<Machine> machines;
    public ArrayList<Unit> units;

    public void addMachine(Machine machine)
    {
        if (this.machines==null)
        {
            this.machines=new ArrayList<>();
        }

        machine.id=UUID.randomUUID().toString().replace("-","");
        this.machines.add(machine);
    }

    public void addUnit(Unit unit)
    {
        if (this.units==null)
        {
            this.units=new ArrayList<>();
        }

        unit.id=UUID.randomUUID().toString().replace("-","");
        this.units.add(unit);
    }

    public static class Machine{
        public String id;
        public String machineNameFa;
        public String machineNameEn;
        public String pmCode;
    }

    public static class Unit
    {
        public String id;
        public String unitNameFa;
        public String unitNameEn;

        public ArrayList<Machine> machines;
        public ArrayList<Unit> units;

        public void addMachine(Machine machine)
        {
            if (this.machines==null)
            {
                this.machines=new ArrayList<>();
            }

            machine.id=UUID.randomUUID().toString().replace("-","");
            this.machines.add(machine);
        }

        public void addUnit(Unit unit)
        {
            if (this.units==null)
            {
                this.units=new ArrayList<>();
            }

            unit.id=UUID.randomUUID().toString().replace("-","");
            this.units.add(unit);
        }
    }
}
