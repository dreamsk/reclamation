package com.reclamation.mapper;

import com.reclamation.sysRole.domain.SysRole;
import com.reclamation.sysRole.domain.SysRoleExample;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface SysRoleMapper {
    long countByExample(SysRoleExample example);

    int deleteByExample(SysRoleExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(SysRole record);

    int insertSelective(SysRole record);

    List<SysRole> selectByExampleWithBLOBs(SysRoleExample example);

    List<SysRole> selectByExample(SysRoleExample example);

    SysRole selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") SysRole record, @Param("example") SysRoleExample example);

    int updateByExampleWithBLOBs(@Param("record") SysRole record, @Param("example") SysRoleExample example);

    int updateByExample(@Param("record") SysRole record, @Param("example") SysRoleExample example);

    int updateByPrimaryKeySelective(SysRole record);

    int updateByPrimaryKeyWithBLOBs(SysRole record);

    int updateByPrimaryKey(SysRole record);
    List<SysRole> getPageList(@Param("search")String search,@Param("subSQL")String subSQL);
    String getRoleNameById (Integer id);

    int deleteByPrimaryKeys(@Param("idlist")List<Integer> idlist);

    List<SysRole> selectAll();
}