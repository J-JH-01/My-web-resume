package com.jjh.jpstudy.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.jjh.jpstudy.dto.Member;

@Mapper
public interface MemberMapper {

    int checkMemberId(String memberId);

    int insertMember(Member member);

    Member selectMemberById(String memberId);
}