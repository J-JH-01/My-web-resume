package com.jjh.jpstudy.controller;
import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.jjh.jpstudy.dto.StudyItem;
import com.jjh.jpstudy.service.StudyItemService;

@RestController
public class StudyItemController {

    private final StudyItemService service;

    public StudyItemController(StudyItemService service) {
        this.service = service;
    }

    @GetMapping("/api/study-items")
    public List<StudyItem> selectStudyItemList() {
        return service.selectStudyItemList();
    }
}