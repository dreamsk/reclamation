package com.reclamation.sysRole.service;

import com.reclamation.sysRole.domain.SysRole;
import com.reclamation.utils.DataTables;

import java.util.List;
import java.util.Map;

public interface SysRoleService {
    DataTables getPageList(DataTables dataTables);

    Map<String,String> add(SysRole sysRole, String menuIds);

    Map<String,String> del(List<Integer> idlist);

    SysRole getRoleById(Integer id);

    Map<String,String> update(SysRole sysRole, String menuIds);

    List<SysRole> selectAll();
}
