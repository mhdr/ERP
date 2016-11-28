package com.nasimeshomal.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Objects;
import java.util.UUID;

@Document(collection = "machinery")
public class Machinery {

    @Id
    public String id;
    public int machineryType;
    @Indexed
    public String parentId;
    public Unit unit;
    public Machine machine;
    public Folder folder;

    public Machinery(int type)
    {
        this.machineryType=type;

        if (this.machineryType==MachineryType.Unit)
        {
            this.unit=new Unit();
        }
        else if (this.machineryType==MachineryType.Machine)
        {
            this.machine=new Machine();
        }
        else if (this.machineryType==MachineryType.Folder)
        {
            this.folder=new Folder();
        }
    }

    public Machinery(int type,String parentId)
    {
        this(type);
        this.parentId=parentId;
    }

    public static class Unit {
        // machinery type 1
        public String unitNameFa;
        public String unitNameEn;
        //
    }

    public static class Machine {
        // machinery type 2
        public String machineNameFa;
        public String machineNameEn;
        public String pmCode;
        //
    }

    public static class Folder {
        // machinery type 3
        public String folderNameFa;
        public String folderNameEn;
        //
    }

    public static class MachineryType {
        public static final int Unit = 1;
        public static final int Machine = 2;
        public static final int Folder = 3;
    }
}
