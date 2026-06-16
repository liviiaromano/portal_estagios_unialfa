package com.unialfa.service;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class ApiService {

    private static final String URL_BASE = "http://localhost:3000";

    private final OkHttpClient client = new OkHttpClient();

    private String get(String endpoint) {
        try {
            Request request = new Request.Builder()
                    .url(URL_BASE + endpoint)
                    .build();

            Response response = client.newCall(request).execute();

            if (response.body() != null) {
                return response.body().string();
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return "";
    }

    public String listarAlunos() {
        return get("/alunos");
    }

    public String listarEmpresas() {
        return get("/empresas");
    }

    public String listarVagas() {
        return get("/vagas");
    }

    public String listarCandidaturas() {
        return get("/candidaturas");
    }
}