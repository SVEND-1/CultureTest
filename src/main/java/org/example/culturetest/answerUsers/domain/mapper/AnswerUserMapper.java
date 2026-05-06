package org.example.culturetest.answerUsers.domain.mapper;

import org.example.culturetest.answerUsers.api.dto.AnswerUser;
import org.example.culturetest.answerUsers.db.AnswerUserEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerUserMapper {

    @Mapping(source = "question.id", target = "questionId")
    AnswerUser convertEntityToDTO(AnswerUserEntity entity);

    List<AnswerUser> convertEntityListToDTO(List<AnswerUserEntity> entities);
}