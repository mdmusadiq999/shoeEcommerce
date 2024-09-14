package com.estate.repo;

import com.estate.entity.UserDto;
import com.estate.entity.UsersEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepo extends CrudRepository<UsersEntity,Integer> {
    UsersEntity findByEmail(String email);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    boolean existsByMobile(Long mobile);
    UsersEntity findByUserId(int userId);

    @Query("SELECT u.email FROM UsersEntity u WHERE u.username = ?1")
    String findEmailByUsername(String username);

    @Query("SELECT new com.estate.entity.UserDto(u.userId, u.username, u.password, u.email, u.mobile, u.address)"+
            "FROM UsersEntity u " +
            "WHERE u.userId = :userId")
    UserDto findUserByUserId(@Param("userId") int userId);

    @Query("SELECT new com.estate.entity.UserDto(u.userId, u.username, u.password, u.email, u.mobile, u.address) FROM UsersEntity u")
    List<UserDto> findAllUsersWithSpecificFields();
}
