package com.reclamation.housingEstate.service;

import com.reclamation.housingEstate.domain.HousingEstate;
import com.reclamation.utils.DataTables;

import java.util.List;
import java.util.Map;

public interface HousingEstateService {
    DataTables getPageList(DataTables dataTables);

    Map<String,String> add(HousingEstate housingEstate);

    HousingEstate getHousingEstateById(Integer id);

    Map<String,String> update(HousingEstate housingEstate);

    Map<String,String> del(List<Integer> idlist);

    List<HousingEstate> getHousingEstateByCityCode(String cityCode);
}
