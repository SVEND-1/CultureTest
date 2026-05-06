package org.example.culturetest.users.domain;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.culturetest.users.api.dto.admin.response.AdminOpenUserProfile;
import org.example.culturetest.users.api.dto.users.User;
import org.example.culturetest.users.api.dto.users.response.UserDefaultResponse;
import org.example.culturetest.users.db.UserEntity;
import org.example.culturetest.users.db.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminService {
    private final UserService userService;
    private final UserRepository userRepository;

    public List<UserDefaultResponse> userList() {
        try {
            return userService.findAll();
        }catch (Exception e) {
            log.error("Не удалось получить список пользователей,ex={}",e.getMessage());
            throw new RuntimeException(e);
        }
    }

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
