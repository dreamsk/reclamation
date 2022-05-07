package com.reclamation.mapper;

import com.reclamation.sysDict.domain.SysDict;
import com.reclamation.sysDict.domain.SysDictExample;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface SysDictMapper {
    long countByExample(SysDictExample example);

    int deleteByExample(SysDictExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(SysDict record);

    int insertSelective(SysDict record);

    List<SysDict> selectByExample(SysDictExample example);

    SysDict selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") SysDict record, @Param("example") SysDictExample example);

    int updateByExample(@Param("record") SysDict record, @Param("example") SysDictExample example);

    int updateByPrimaryKeySelective(SysDict record);

    int updateByPrimaryKey(SysDict record);

    List<SysDict> getPageList(@Param("search")String search, @Param("subSQL")String subSQL);

    int deleteByPrimaryKeys(@Param("idlist")List<Integer> idlist);

    String getScrapNameByCode(String code);

    List<SysDict> selectAll(String dict_tabname);

    String getSexValByCode(String code);
}