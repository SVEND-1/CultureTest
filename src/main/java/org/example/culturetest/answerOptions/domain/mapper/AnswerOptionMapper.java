package org.example.culturetest.answerOptions.domain.mapper;

import org.example.culturetest.answerOptions.api.dto.AnswerOption;
import org.example.culturetest.answerOptions.db.AnswerOptionEntity;
import org.mapstruct.Mapper;
import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerOptionMapper {
    AnswerOption convertEntityToDTO(AnswerOptionEntity entity);
    List<AnswerOption> convertEntityListToDTO(List<AnswerOptionEntity> entities);
}
