package com.ecom.utils;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.*;

public class QueryParamsParser {
    public static String convertToQueryParams(HashMap<String, String> params) throws UnsupportedEncodingException {
        StringBuilder query = new StringBuilder();
        List<String> fieldNames = new ArrayList<>(params.keySet());

        Collections.sort(fieldNames);

        Iterator<String> itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = itr.next();
            String fieldValue = params.get(fieldName);
            if ((fieldValue != null) && (!fieldValue.isEmpty())) {
                query.append(URLEncoder.encode(fieldName,
                        StandardCharsets.US_ASCII));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue,
                        StandardCharsets.US_ASCII));
                if (itr.hasNext()) {
                    query.append('&');
                }
            }
        }

        return query.toString();
    }
}
