package com.nasimeshomal.bl;

import com.nasimeshomal.config.MongoConfig;
import com.nasimeshomal.model.Machinery;
import com.nasimeshomal.model.User;
import org.apache.commons.lang3.StringUtils;
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

            Map<String,Long> countChildren=new HashMap<>();

            for (Machinery m:machinery)
            {
                Query query2=new Query();
                query2.addCriteria(Criteria.where("parentId").is(m.id));
                long count=mongoOperations.count(query2,Machinery.class);
                countChildren.put(m.id,count);
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
            result.put("countChildren",countChildren);
            result.put("parents", parents);
            result.put("error", 0);

        } catch (Exception ex) {
            // exception
            result.put("error", 1);
            ex.printStackTrace();
        }

        return result;
    }
}
