package org.example.culturetest.questions.domain.mapper;

import org.example.culturetest.questions.api.dto.Question;
import org.example.culturetest.questions.db.QuestionEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    Question convertEntityToDTO(QuestionEntity entity);
    List<Question> convertEntityListToDTO(List<QuestionEntity> entities);
}
