package com.reclamation.mapper;

import com.reclamation.owner.domain.Owner;
import com.reclamation.owner.domain.OwnerExample;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface OwnerMapper {
    long countByExample(OwnerExample example);

    int deleteByExample(OwnerExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(Owner record);

    int insertSelective(Owner record);

    List<Owner> selectByExample(OwnerExample example);

    Owner selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") Owner record, @Param("example") OwnerExample example);

    int updateByExample(@Param("record") Owner record, @Param("example") OwnerExample example);

    int updateByPrimaryKeySelective(Owner record);

    int updateByPrimaryKey(Owner record);

    List<Owner> getPageList(@Param("search")String search, @Param("subSQL")String subSQL);
}