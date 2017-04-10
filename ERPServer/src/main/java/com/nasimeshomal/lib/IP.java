package com.nasimeshomal.lib;

import org.apache.commons.lang3.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/**
 * Created by mahmood on 11/15/16.
 */
public class IP {

    HttpServletRequest request;
    HttpServletResponse response;

    public IP(HttpServletRequest request, HttpServletResponse response)
    {
        this.request=request;
        this.response=response;
    }

    public String getIP()
    {
        String ip="";

        ip=request.getHeader("X-FORWARDED-FOR");

        if (StringUtils.isBlank(ip))
        {
            ip=request.getRemoteAddr();
        }

        return ip;
    }

    public Map<String,Object> getIP2()
    {
        Map<String,Object> result=new HashMap<String,Object>();

        try {
            String ip="";

            ip=request.getHeader("X-FORWARDED-FOR");

            if (StringUtils.isBlank(ip))
            {
                ip=request.getRemoteAddr();
            }

            result.put("error",0);
            result.put("ip",ip);
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
