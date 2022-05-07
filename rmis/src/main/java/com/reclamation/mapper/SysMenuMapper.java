package com.reclamation.mapper;

import com.reclamation.sysMenu.domain.SysMenu;
import com.reclamation.sysMenu.domain.SysMenuExample;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface SysMenuMapper {
    long countByExample(SysMenuExample example);

    int deleteByExample(SysMenuExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(SysMenu record);

    int insertSelective(SysMenu record);

    List<SysMenu> selectByExample(SysMenuExample example);

    SysMenu selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") SysMenu record, @Param("example") SysMenuExample example);

    int updateByExample(@Param("record") SysMenu record, @Param("example") SysMenuExample example);

    int updateByPrimaryKeySelective(SysMenu record);

    int updateByPrimaryKey(SysMenu record);

    List<SysMenu> getPageList(@Param("search")String search, @Param("subSQL")String subSQL);
    String getParentName(Integer id);

    List<SysMenu> selectAll();
    int deleteByPrimaryKeys(@Param("idlist")List<Integer> idlist);

    List<SysMenu> getMenusByUserName(String currentUsername);
}