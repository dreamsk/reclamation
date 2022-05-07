package com.reclamation.mapper;

import com.reclamation.housingEstate.domain.HousingEstate;
import com.reclamation.housingEstate.domain.HousingEstateExample;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface HousingEstateMapper {
    long countByExample(HousingEstateExample example);

    int deleteByExample(HousingEstateExample example);

    int deleteByPrimaryKey(Integer id);

    int insert(HousingEstate record);

    int insertSelective(HousingEstate record);

    List<HousingEstate> selectByExample(HousingEstateExample example);

    HousingEstate selectByPrimaryKey(Integer id);

    int updateByExampleSelective(@Param("record") HousingEstate record, @Param("example") HousingEstateExample example);

    int updateByExample(@Param("record") HousingEstate record, @Param("example") HousingEstateExample example);

    int updateByPrimaryKeySelective(HousingEstate record);

    int updateByPrimaryKey(HousingEstate record);

    List<HousingEstate> getPageList(@Param("search")String search, @Param("subSQL")String subSQL);

    int deleteByPrimaryKeys(@Param("idlist")List<Integer> idlist);

    String getHousingEstateByCode(String code);

    List<HousingEstate> getHousingEstateByCityCode(String cityCode);

    String getCityCodeByCode(String code);

    String getProvinceCodeByCode(String code);

    String getProvinceAndCityNameByCode(String code);
    String getProvinceAndCityAndHousingEstateNameByCode(String code);

}