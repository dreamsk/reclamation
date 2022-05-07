package com.reclamation.scrap.service;

import com.reclamation.scrap.domain.Scrap;
import com.reclamation.utils.DataTables;

import java.util.List;
import java.util.Map;

public interface ScrapService {
    DataTables getPageList(DataTables dataTables);

    Map<String,String> add(Scrap scrap);

    Scrap getScrapById(Integer id);

    Map<String,String> update(Scrap scrap);

    Map<String,String> del(List<Integer> idlist);
}
