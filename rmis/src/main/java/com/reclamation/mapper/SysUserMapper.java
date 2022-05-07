package com.reclamation.mapper;

import com.reclamation.sysUser.domain.SysUser;
import com.reclamation.sysUser.domain.SysUserExample;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface SysUserMapper {
    long countByExample(SysUserExample example);

    int deleteByExample(SysUserExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(SysUser record);

    int insertSelective(SysUser record);

    List<SysUser> selectByExample(SysUserExample example);

    SysUser selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") SysUser record, @Param("example") SysUserExample example);

    int updateByExample(@Param("record") SysUser record, @Param("example") SysUserExample example);

    int updateByPrimaryKeySelective(SysUser record);

    int updateByPrimaryKey(SysUser record);
    SysUser selectByNameAndPwd(@Param("username") String username,@Param("password") String password);

    List<SysUser> getPageList(@Param("search")String search, @Param("subSQL")String subSQL);

    String getCreatName(Integer id);

    int deleteByPrimaryKeys(@Param("idlist") List<Integer> idlist);

    SysUser getUserByName(String username);
}