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
    public String unitNameFa="";
    public String unitNameEn="";
    public ArrayList<Machine> machines;

    public Machinery()
    {
        this.machines=new ArrayList<>();
    }

    public static class Machine{
        public String id;
        public String machineNameFa;
        public String machineNameEn;
        public String pmCode;
    }

    public void addMachine(Machine machine)
    {
        machine.id= UUID.randomUUID().toString().replace("-","");
        this.machines.add(machine);
    }

    public void removeMachine(String id)
    {
        this.machines.removeIf(machine -> Objects.equals(machine.id, id));
    }

    public Machine findById(String id)
    {
        for (Machine machine:machines)
        {
            if (Objects.equals(machine.id, id))
            {
                return machine;
            }
        }

        return null;
    }
}
