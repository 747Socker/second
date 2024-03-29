package com.ssafy.maryflower.global.auth.data.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class KakaoOAuthAccessTokenResponse {

    @JsonProperty("access_token")
    private String accessToken;
//    @JsonProperty("token_type")
//    private String tokenType;
//    @JsonProperty("refresh_token")
//    private String refreshToken;
//    @JsonProperty("id_token")
//    private String idToken;
//    @JsonProperty("expires_in")
//    private int expiresIn;
//    private String scope;
//    @JsonProperty("refresh_token_expires_in")
//    private int refreshTokenExpiresIn;
}
