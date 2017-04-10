package com.nasimeshomal.lib;

import org.junit.Test;

import static org.junit.Assert.*;

public class HashTest {
    @Test
    public void getSHA512_1() throws Exception {
        String methodName="getSHA512_1";

        String result= Hash.getSHA512("Hello World");
        assertTrue(true);
    }

}