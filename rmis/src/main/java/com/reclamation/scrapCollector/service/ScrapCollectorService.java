package com.reclamation.scrapCollector.service;

import com.reclamation.scrapCollector.domain.ScrapCollector;
import com.reclamation.utils.DataTables;

import java.util.List;
import java.util.Map;

public interface ScrapCollectorService {
    DataTables getPageList(DataTables dataTables);

    Map<String,String> add(ScrapCollector scrapCollector);

    ScrapCollector getScrapCollectorById(Integer id);

    Map<String,String> update(ScrapCollector scrapCollector);

    Map<String,String> del(List<Integer> idlist);
}
