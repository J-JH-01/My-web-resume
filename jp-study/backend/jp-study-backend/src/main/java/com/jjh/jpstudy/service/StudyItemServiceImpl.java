package com.jjh.jpstudy.service;
import java.util.List;
import org.springframework.stereotype.Service;
import com.jjh.jpstudy.dto.StudyItem;

@Service
public class StudyItemServiceImpl implements StudyItemService {

    @Override
    public List<StudyItem> selectStudyItemList() {
        return List.of(
            new StudyItem(1, "話す", "はなす", "말하다"),
            new StudyItem(2, "水", "みず", "물입니다")
        );
    }
}