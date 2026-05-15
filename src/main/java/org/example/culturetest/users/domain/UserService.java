package org.example.culturetest.users.domain;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.culturetest.answerOptions.db.AnswerOptionEntity;
import org.example.culturetest.answerUsers.db.AnswerUserEntity;
import org.example.culturetest.config.JwtTokenProvider;
import org.example.culturetest.questions.db.QuestionEntity;
import org.example.culturetest.questions.db.QuestionType;
import org.example.culturetest.testAttempts.api.dto.response.TestAttemptProfile;
import org.example.culturetest.testAttempts.db.TestAttemptEntity;
import org.example.culturetest.testAttempts.db.TestAttemptsRepository;
import org.example.culturetest.testAttempts.domain.mapper.TestAttemptMapper;
import org.example.culturetest.users.api.dto.users.User;
import org.example.culturetest.users.api.dto.users.request.UserCreateRequest;
import org.example.culturetest.users.api.dto.users.response.UserDefaultResponse;
import org.example.culturetest.users.api.dto.users.response.UserProfileResponse;
import org.example.culturetest.users.api.dto.users.response.UserRegistrationResponse;
import org.example.culturetest.users.db.UserEntity;
import org.example.culturetest.users.db.UserRepository;
import org.example.culturetest.users.domain.mapper.UserMapper;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final JwtTokenProvider jwtTokenProvider;
    private final TestAttemptsRepository testAttemptsRepository;
    private final TestAttemptMapper testAttemptMapper;

    public UserEntity getCurrentUser() {
        String token = jwtTokenProvider.getCurrentToken();
        String email = jwtTokenProvider.getEmailFromToken(token);
        UserEntity user = userRepository.findByEmailEqualsIgnoreCase(email);
        notFoundUser(user);
        return user;
    }

    public List<UserDefaultResponse> findAll(){
        return userMapper.convertEntitiesToUserDefaultResponses(userRepository.findAll());
    }

    public UserEntity findUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Пользователь не найден"));
    }

    public UserRegistrationResponse findUserByEmail(String email) {
        if (email == null) {
            log.debug("Пустой email,поиск пользователя не возможен");
            throw new IllegalArgumentException("Пустой email пользователя");
        }

        UserEntity user = userRepository.findByEmailEqualsIgnoreCase(email);
        return userMapper.convertEntityToDto(user);
    }

    @Transactional
    public UserProfileResponse getUserProfile() {
        try {
            UserEntity user = getCurrentUser();
            List<TestAttemptEntity> completedAttempts = testAttemptsRepository
                    .findAllByUserId(user.getId())
                    .stream()
                    .filter(a -> a.getCompletedAt() != null)
                    .toList();

            double totalScore = completedAttempts.stream()
                    .mapToDouble(TestAttemptEntity::getTotalScore)
                    .average()
                    .orElse(0);

            double totalScoreThinking = calcAvgByType(completedAttempts, QuestionType.THINKING);
            double totalScoreAffiliation = calcAvgByType(completedAttempts, QuestionType.AFFILIATION);
            double totalScoreFlexibility = calcAvgByType(completedAttempts, QuestionType.FLEXIBILITY);
            double totalScoreExperience = calcAvgByType(completedAttempts, QuestionType.EXPERIENCE);

            List<TestAttemptProfile> attempts = completedAttempts.stream()
                    .map(testAttemptMapper::convertEntityToProfile)
                    .toList();

            return new UserProfileResponse(
                    user.getName(),
                    user.getEmail(),
                    attempts,
                    totalScore,
                    totalScoreThinking,
                    totalScoreAffiliation,
                    totalScoreFlexibility,
                    totalScoreExperience
            );
        }catch (Exception e){
            log.error("Не получилось загрузить профиль,ex={}",e.getMessage());
            throw new RuntimeException(e);
        }
    }

    private double calcAvgByType(List<TestAttemptEntity> attempts, QuestionType type) {
        return attempts.stream()
                .mapToDouble(attempt -> {
                    List<QuestionEntity> questions = attempt.getTest().getQuestions();
                    List<AnswerUserEntity> answers = attempt.getUserAnswers();

                    long totalForType = questions.stream()
                            .filter(q -> q.getType() == type)
                            .count();

                    if (totalForType == 0) return 0;

                    long correctCount = answers.stream()
                            .filter(a -> a.getQuestion().getType() == type)
                            .filter(AnswerUserEntity::getIsCorrect)
                            .count();

                    double raw = (double) correctCount / totalForType * 100;
                    return Math.round(raw * 100.0) / 100.0;
                })
                .average()
                .orElse(0);
    }

    public UserRegistrationResponse save(UserCreateRequest request) {
        try {
            log.info("Сохранения пользователя с email={}", request.email());
            UserEntity savedUser = UserEntity.builder()
                    .email(request.email())
                    .name(request.name())
                    .password(request.password())
                    .role(request.role())
                    .createdAt(LocalDateTime.now())
                    .build();
            UserEntity saved = userRepository.save(savedUser);
            return userMapper.convertEntityToDto(saved);
        } catch (Exception e) {
            log.info("Не удалось сохранить пользователя,ex={}", e.getMessage());
            throw new RuntimeException("Не удалось сохранить пользователя,ex=" + e.getMessage());
        }
    }

    @Transactional
    public UserRegistrationResponse update(Long id, UserEntity userToUpdate) {
        try {
            log.info("Обновление пользователя с id={}", id);
            UserEntity user = userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Пользователь не найден"));

            UserEntity updatedUser = UserEntity.builder()
                    .id(user.getId())
                    .name(userToUpdate.getName())
                    .email(userToUpdate.getEmail())
                    .password(user.getPassword())
                    .build();

            UserEntity savedUser = userRepository.save(updatedUser);
            log.info("Пользователь обновлен с id={}", savedUser.getId());
            return userMapper.convertEntityToDto(savedUser);
        } catch (DataIntegrityViolationException e) {
            log.error("Ошибка обновление пользователя id={}, ex={}", id, e.getMessage());
            throw new RuntimeException("Ошибка обновление пользователя", e);
        }
    }

    @Transactional
    public UserRegistrationResponse changePassword(Long id, String newPassword) {
        try {
            log.info("Обновление пароля у пользователя с id={}", id);
            UserEntity user = userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Пользователь не найден"));

            user.setPassword(newPassword);

            UserEntity savedUser = userRepository.save(user);
            log.info("Пароль пользователя обновлен с id={}", savedUser.getId());
            return userMapper.convertEntityToDto(savedUser);
        } catch (Exception e) {
            log.error("Ошибка смена пароля пользователя id={}, ex={}", id, e.getMessage());
            throw new RuntimeException(
                    "Не удалось изменить пароль, ex=" + e.getMessage()
            );
        }
    }

    public void delete(Long id) {
        try {
            userRepository.deleteById(id);
            log.info("Пользователб с id={} удален", id);
        } catch (Exception e) {
            log.error("Не удалось удалить пользователя с id={}, ex={}", id, e.getMessage());
            throw new RuntimeException();
        }
    }

    private static void notFoundUser(UserEntity user) {
        if (user == null) {
            log.error("Авторизованный пользователь не найдет");
            throw new IllegalArgumentException("Не найден пользователь");
        }
    }

}
