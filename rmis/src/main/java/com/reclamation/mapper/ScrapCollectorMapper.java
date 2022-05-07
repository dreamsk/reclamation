package com.reclamation.mapper;

import com.reclamation.scrapCollector.domain.ScrapCollector;
import com.reclamation.scrapCollector.domain.ScrapCollectorExample;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ScrapCollectorMapper {
    long countByExample(ScrapCollectorExample example);

    int deleteByExample(ScrapCollectorExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(ScrapCollector record);

    int insertSelective(ScrapCollector record);

    List<ScrapCollector> selectByExample(ScrapCollectorExample example);

    ScrapCollector selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") ScrapCollector record, @Param("example") ScrapCollectorExample example);

    int updateByExample(@Param("record") ScrapCollector record, @Param("example") ScrapCollectorExample example);

    int updateByPrimaryKeySelective(ScrapCollector record);

    int updateByPrimaryKey(ScrapCollector record);

    List<ScrapCollector> getPageList(@Param("search")String search, @Param("subSQL")String subSQL);

    int deleteByPrimaryKeys(@Param("idlist")List<Integer> idlist);
}