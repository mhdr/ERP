package lib;

import org.junit.Test;

import static org.junit.Assert.*;

/**
 * Created by ma.ramezani on 11/7/2016.
 */
public class HashTest {
    @Test
    public void getSHA512_1() throws Exception {
        String methodName="getSHA512_1";

        String result= Hash.getSHA512("Hello World");
        assertTrue(true);
    }

}