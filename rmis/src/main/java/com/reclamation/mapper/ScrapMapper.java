package com.reclamation.mapper;

import com.reclamation.scrap.domain.Scrap;
import com.reclamation.scrap.domain.ScrapExample;
import com.reclamation.sysMenu.domain.SysMenu;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ScrapMapper {
    long countByExample(ScrapExample example);

    int deleteByExample(ScrapExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(Scrap record);

    int insertSelective(Scrap record);

    List<Scrap> selectByExample(ScrapExample example);

    Scrap selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") Scrap record, @Param("example") ScrapExample example);

    int updateByExample(@Param("record") Scrap record, @Param("example") ScrapExample example);

    int updateByPrimaryKeySelective(Scrap record);

    int updateByPrimaryKey(Scrap record);
    List<Scrap> getPageList(@Param("search")String search, @Param("subSQL")String subSQL);

    int deleteByPrimaryKeys(@Param("idlist")List<Integer> idlist);
}