package com.nasimeshomal.bl;

import com.mongodb.WriteResult;
import com.nasimeshomal.config.MongoConfig;
import com.nasimeshomal.model.Machinery;
import com.nasimeshomal.model.User;
import org.apache.commons.lang3.StringUtils;
import org.codehaus.groovy.classgen.asm.ExpressionAsVariableSlot;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.*;

public class MachineryBL {
    MongoOperations mongoOperations;
    HttpServletRequest request;
    HttpServletResponse response;

    public MachineryBL(HttpServletRequest request, HttpServletResponse response) {
        this.request = request;
        this.response = response;

        ApplicationContext ctx =
                new AnnotationConfigApplicationContext(MongoConfig.class);
        this.mongoOperations = (MongoOperations) ctx.getBean("mongoTemplate");
    }

    public Map<String, Object> getMachinery() {
        Map<String, Object> result = new HashMap<>();

        try {
            Map<String, String[]> data = request.getParameterMap();
            String parentId = "";

            if (data.containsKey("parentId")) {
                parentId = data.get("parentId")[0];
            } else {
                // no parentId in request
                result.put("error", 2);
                return result;
            }


            Query query = new Query();
            query.addCriteria(Criteria.where("parentId").is(parentId));
            List<Machinery> machinery = mongoOperations.find(query, Machinery.class);

            Map<String, Long> countChildren = new HashMap<>();

            for (Machinery m : machinery) {
                Query query2 = new Query();
                query2.addCriteria(Criteria.where("parentId").is(m.id));
                long count = mongoOperations.count(query2, Machinery.class);
                countChildren.put(m.id, count);
            }

            List<Map<String, String>> parents = new ArrayList<>();

            if (StringUtils.isNotBlank(parentId)) {
                String matchedParentId = parentId;

                do {
                    Query query1 = new Query();
                    query1.addCriteria(Criteria.where("id").is(matchedParentId));
                    Machinery parentMachinery = mongoOperations.findOne(query1, Machinery.class);

                    if (parentMachinery.machineryType == Machinery.MachineryType.Unit) {
                        Map<String, String> p = new HashMap<>();
                        p.put("id", parentMachinery.id);
                        p.put("value", parentMachinery.unit.unitNameFa);
                        parents.add(p);
                    } else if (parentMachinery.machineryType == Machinery.MachineryType.Machine) {
                        Map<String, String> p = new HashMap<>();
                        p.put("id", parentMachinery.id);
                        p.put("value", parentMachinery.machine.machineNameFa);
                        parents.add(p);
                    } else if (parentMachinery.machineryType == Machinery.MachineryType.Folder) {
                        Map<String, String> p = new HashMap<>();
                        p.put("id", parentMachinery.id);
                        p.put("value", parentMachinery.folder.folderNameFa);
                        parents.add(p);
                    }

                    matchedParentId = parentMachinery.parentId;
                } while (matchedParentId.length() > 0);
            }

            Collections.reverse(parents);

            result.put("machinery", machinery);
            result.put("countChildren", countChildren);
            result.put("parents", parents);
            result.put("error", 0);

        } catch (Exception ex) {
            // exception
            result.put("error", 1);
            ex.printStackTrace();
        }

        return result;
    }

    public Map<String, Object> insertUnit() {
        Map<String, Object> result = new HashMap<>();

        try {
            Map<String, String[]> data = request.getParameterMap();
            String unitNameFa = "";
            String unitNameEn = "";
            String parentId = "";

            if (!data.containsKey("parentId")) {
                result.put("error", 2);
                return result;
            } else {

                parentId = data.get("parentId")[0];

                if (StringUtils.isBlank(parentId)) {
                    parentId = "";
                }
            }

            if (data.containsKey("unitNameEn")) {
                unitNameEn = data.get("unitNameEn")[0];
            }

            unitNameFa = data.get("unitNameFa")[0];

            Machinery machinery = new Machinery(Machinery.MachineryType.Unit);
            machinery.parentId = parentId;
            machinery.unit.unitNameEn = unitNameEn;
            machinery.unit.unitNameFa = unitNameFa;

            mongoOperations.insert(machinery);

            result.put("error", 0);
            result.put("id", machinery.id);
        } catch (Exception ex) {
            // exception
            result.put("error", 1);
            ex.printStackTrace();
        }

        return result;
    }

    public Map<String, Object> deleteMachinery() {
        Map<String, Object> result = new HashMap<>();

        try {
            Map<String, String[]> data = request.getParameterMap();
            String machineryId = "";

            if (!data.containsKey("machineryId")) {
                result.put("error", 2);
                return result;
            } else {

                machineryId = data.get("machineryId")[0];

                if (StringUtils.isBlank(machineryId)) {
                    result.put("error", 3);
                    return result;
                }
            }


            Query query2 = new Query();
            query2.addCriteria(Criteria.where("parentId").is(machineryId));
            long count = mongoOperations.count(query2, Machinery.class);

            if (count>0)
            {
                // item has children
                result.put("error", 4);
                return result;
            }

            Query query = new Query();
            query.addCriteria(Criteria.where("id").is(machineryId));
            WriteResult writeResult = mongoOperations.remove(query,Machinery.class);

            if (writeResult.getN() > 0) {
                result.put("error", 0);
                result.put("id", machineryId);
            } else {
                result.put("error", 4);
            }
        } catch (Exception ex) {
            // exception
            result.put("error", 1);
            ex.printStackTrace();
        }

        return result;
    }

    public Map<String, Object> insertMachine() {
        Map<String, Object> result = new HashMap<>();

        try {
            Map<String, String[]> data = request.getParameterMap();
            String machineNameFa = "";
            String machineNameEn = "";
            String pmCode="";
            String parentId = "";

            if (!data.containsKey("parentId")) {
                result.put("error", 2);
                return result;
            } else {

                parentId = data.get("parentId")[0];

                if (StringUtils.isBlank(parentId)) {
                    parentId = "";
                }
            }

            if (data.containsKey("machineNameEn")) {
                machineNameEn = data.get("machineNameEn")[0];
            }

            if (data.containsKey("pmCode")) {
                pmCode = data.get("pmCode")[0];
            }

            machineNameFa = data.get("machineNameFa")[0];

            if (StringUtils.isNotBlank(pmCode))
            {
                Query query=new Query();
                query.addCriteria(Criteria.where("Machine.pmCode").is(pmCode));
                List<Machinery> matchedPMCode= mongoOperations.find(query,Machinery.class);

                if (matchedPMCode.size()>0)
                {
                    result.put("error", 3);
                    return result;
                }
            }

            Machinery machinery = new Machinery(Machinery.MachineryType.Machine);
            machinery.parentId = parentId;
            machinery.machine.machineNameFa=machineNameFa;
            machinery.machine.machineNameEn=machineNameEn;
            machinery.machine.pmCode=pmCode;

            mongoOperations.insert(machinery);

            result.put("error", 0);
            result.put("id", machinery.id);
        } catch (Exception ex) {
            // exception
            result.put("error", 1);
            ex.printStackTrace();
        }

        return result;
    }
}
