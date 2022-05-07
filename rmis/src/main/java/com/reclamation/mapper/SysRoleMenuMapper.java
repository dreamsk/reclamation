package com.reclamation.mapper;

import com.reclamation.sysMenu.domain.SysMenu;
import com.reclamation.sysRoleMenu.domain.SysRoleMenu;
import com.reclamation.sysRoleMenu.domain.SysRoleMenuExample;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface SysRoleMenuMapper {
    long countByExample(SysRoleMenuExample example);

    int deleteByExample(SysRoleMenuExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(SysRoleMenu record);

    int insertSelective(SysRoleMenu record);

    List<SysRoleMenu> selectByExample(SysRoleMenuExample example);

    SysRoleMenu selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") SysRoleMenu record, @Param("example") SysRoleMenuExample example);

    int updateByExample(@Param("record") SysRoleMenu record, @Param("example") SysRoleMenuExample example);

    int updateByPrimaryKeySelective(SysRoleMenu record);

    int updateByPrimaryKey(SysRoleMenu record);

    int addRoleAndMenus(@Param("roleId") Integer roleId, @Param("menuIds") List<Integer> menuIds);

    int deleteByRoleIds(@Param("idlist")List<Integer> idlist);

    List<SysRoleMenu> getRoleMenusByRoleId(Integer roleId);

    int deleteByRoleId(Integer roleId);
}