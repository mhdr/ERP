package com.nasimeshomal.bl;

import com.nasimeshomal.lib.Statics;

import java.util.HashMap;
import java.util.Map;

public class StaticsBL {

    public Map<String, Object> getVersion()
    {
        Map<String, Object> result = new HashMap<>();

        try {
            result.put("error",0);
            result.put("result", new Statics().getVersion());
        }
        catch (Exception ex)
        {
            // exception
            result.put("error", 1);
            ex.printStackTrace();
        }

        return result;
    }
}
