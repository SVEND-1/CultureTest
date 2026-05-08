package org.example.culturetest.users.domain;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.culturetest.testAttempts.api.dto.TestAttempt;
import org.example.culturetest.testAttempts.domain.TestAttemptService;
import org.example.culturetest.tests.api.dto.Test;
import org.example.culturetest.tests.domain.TestService;
import org.example.culturetest.users.api.dto.admin.response.AdminOpenUserProfile;
import org.example.culturetest.users.api.dto.admin.response.AdminProfile;
import org.example.culturetest.users.db.Role;
import org.example.culturetest.users.db.UserEntity;
import org.example.culturetest.users.db.UserRepository;
import org.example.culturetest.users.domain.mapper.AdminMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminService {
    private final UserRepository userRepository;
    private final TestAttemptService testAttemptService;
    private final TestService testService;
    private final AdminMapper adminMapper;
    private final UserService userService;

    @Transactional
    public AdminProfile profile(){
        try {
            List<TestAttempt> testAttempt = testAttemptService.findAll();
            List<Test> test = testService.findAll();
            return new AdminProfile(
                    adminMapper.convertToTestAttemptAdmin(testAttempt),
                    test
            );
        }catch (Exception e) {
            log.error("Не получилось получить данные профиля админа,ex={}",e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public AdminOpenUserProfile openUserProfile(Long id) {
        try {
            UserEntity user = userService.findUserById(id);
            return new AdminOpenUserProfile(
                    user.getId(),
                    userService.getUserProfile(),
                    user.getPrivateNote()
            );
        }catch (Exception e){
            log.error("Не получилось загрузить профиль пользователя для админа userId={},ex={}",id,e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public String setRole(String email){
        try {
            UserEntity user = userRepository.findByEmailEqualsIgnoreCase(email);
            user.setRole(Role.ADMIN);
            userRepository.save(user);
            return "Успешно";
        }catch (Exception e) {
            log.error("Не удалось сменить роль ,ex={}",e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public String writeComment(Long id,String comment) {
        try {
            UserEntity user = userService.findUserById(id);
            user.setPrivateNote(comment);
            userRepository.save(user);
            return "Успешно";
        }catch (Exception e) {
            log.error("Не получилось оставить комментарий userId={},ex={}",id,e.getMessage());
            throw new RuntimeException(e);
        }
    }
}
