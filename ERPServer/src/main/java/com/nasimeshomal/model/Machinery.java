package com.nasimeshomal.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "machinery")
public class Machinery {

    @Id
    public String id;
    public MachineryType machineryType;
    @Indexed()
    public String parentId;
    public Unit unit;
    public Machine machine;
    public Folder folder;

    public Machinery(MachineryType type)
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

    public Machinery(MachineryType type,String parentId)
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

    public enum MachineryType{
        Unit ,Machine,Folder
    }
}
