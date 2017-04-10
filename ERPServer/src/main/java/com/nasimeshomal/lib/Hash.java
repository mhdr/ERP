package com.nasimeshomal.lib;

import org.bouncycastle.crypto.digests.SHA512Digest;

public class Hash {
    public static String getSHA512(String key) {
        SHA512Digest digester = new SHA512Digest();
        byte[] retValue = new byte[digester.getDigestSize()];
        digester.update(key.getBytes(), 0, key.length());
        digester.doFinal(retValue, 0);
        String result=String.format("%064x", new java.math.BigInteger(1, retValue));
        return result;
    }
}
