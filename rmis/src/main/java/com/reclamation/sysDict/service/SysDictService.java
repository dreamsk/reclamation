package com.reclamation.sysDict.service;

import com.reclamation.sysDict.domain.SysDict;
import com.reclamation.utils.DataTables;

import java.util.List;
import java.util.Map;

public interface SysDictService {
    DataTables getPageList(DataTables dataTables);

    Map<String,String> add(SysDict sysDict);

    SysDict getDictById(Integer id);

    Map<String,String> update(SysDict sysDict);

    Map<String,String> del(List<Integer> idlist);

    List<SysDict> selectAll(String dict_tabname);

}
