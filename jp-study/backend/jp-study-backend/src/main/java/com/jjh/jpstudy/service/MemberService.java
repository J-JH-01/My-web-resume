package com.jjh.jpstudy.service;

import com.jjh.jpstudy.dto.Member;

public interface MemberService {

    int signup(Member inputMember);

    Member login(Member inputMember);

    Member updateMemberInfo(Member inputMember);

    Member updateProfileImage(Member member);
}