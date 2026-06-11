package com.jjh.jpstudy.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class Member {

    private int memberNo;
    private String memberId;
    private String memberPw;
    private String memberNickname;
    private String memberRole;
    private String enrollDate;
    private String deleteFl;
    private String profileImg;

    // 회원정보 수정용
    private String currentPw;
    private String newPw;
}