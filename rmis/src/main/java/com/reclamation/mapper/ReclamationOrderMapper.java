package com.reclamation.mapper;

import com.reclamation.reclamationOrder.domain.ReclamationOrder;
import com.reclamation.reclamationOrder.domain.ReclamationOrderExample;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ReclamationOrderMapper {
    long countByExample(ReclamationOrderExample example);

    int deleteByExample(ReclamationOrderExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(ReclamationOrder record);

    int insertSelective(ReclamationOrder record);

    List<ReclamationOrder> selectByExample(ReclamationOrderExample example);

    ReclamationOrder selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") ReclamationOrder record, @Param("example") ReclamationOrderExample example);

    int updateByExample(@Param("record") ReclamationOrder record, @Param("example") ReclamationOrderExample example);

    int updateByPrimaryKeySelective(ReclamationOrder record);

    int updateByPrimaryKey(ReclamationOrder record);

    List<ReclamationOrder> getPageList(@Param("search")String search, @Param("subSQL")String subSQL);
}