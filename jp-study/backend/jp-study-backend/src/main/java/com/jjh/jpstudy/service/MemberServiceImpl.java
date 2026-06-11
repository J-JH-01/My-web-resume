package com.jjh.jpstudy.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.jjh.jpstudy.dto.Member;
import com.jjh.jpstudy.mapper.MemberMapper;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberMapper memberMapper;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public int signup(Member inputMember) {

        int count = memberMapper.checkMemberId(inputMember.getMemberId());

        if (count > 0) {
            return -1;
        }

        String encPw = bCryptPasswordEncoder.encode(inputMember.getMemberPw());
        inputMember.setMemberPw(encPw);

        return memberMapper.insertMember(inputMember);
    }

    @Override
    public Member login(Member inputMember) {

        Member savedMember = memberMapper.selectMemberById(inputMember.getMemberId());

        if (savedMember == null) {
            return null;
        }

        boolean isMatched = bCryptPasswordEncoder.matches(
                inputMember.getMemberPw(),
                savedMember.getMemberPw()
        );

        if (!isMatched) {
            return null;
        }

        savedMember.setMemberPw(null);

        return savedMember;
    }
    
    @Override
    public Member updateMemberInfo(Member inputMember) {

        Member savedMember = memberMapper.selectMemberByNo(inputMember.getMemberNo());

        if (savedMember == null) {
            return null;
        }

        if (inputMember.getMemberNickname() == null
                || inputMember.getMemberNickname().trim().isEmpty()) {
            return null;
        }

        // 새 비밀번호를 입력한 경우에만 비밀번호 변경
        if (inputMember.getNewPw() != null && !inputMember.getNewPw().trim().isEmpty()) {

            if (inputMember.getCurrentPw() == null || inputMember.getCurrentPw().trim().isEmpty()) {
                return null;
            }

            boolean isMatched = bCryptPasswordEncoder.matches(
                    inputMember.getCurrentPw(),
                    savedMember.getMemberPw()
            );

            if (!isMatched) {
                return null;
            }

            String encPw = bCryptPasswordEncoder.encode(inputMember.getNewPw());
            inputMember.setMemberPw(encPw);
        }

        int result = memberMapper.updateMemberInfo(inputMember);

        if (result <= 0) {
            return null;
        }

        Member updatedMember = memberMapper.selectMemberByNo(inputMember.getMemberNo());
        updatedMember.setMemberPw(null);

        return updatedMember;
    }
    
    @Override
    public Member updateProfileImage(Member member) {

        int result = memberMapper.updateProfileImage(member);

        if (result <= 0) {
            return null;
        }

        Member updatedMember = memberMapper.selectMemberByNo(member.getMemberNo());

        if (updatedMember != null) {
            updatedMember.setMemberPw(null);
        }

        return updatedMember;
    }
    
}