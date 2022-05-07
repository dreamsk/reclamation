package com.reclamation.sysMenu.service;

import com.reclamation.sysMenu.domain.SysMenu;
import com.reclamation.sysRoleMenu.domain.SysRoleMenu;
import com.reclamation.utils.DataTables;

import java.util.List;
import java.util.Map;

public interface SysMenuService {
    DataTables getPageList(DataTables dataTables);

    Map<String,String> add(SysMenu sysMenu);
    List<SysMenu> selectAll();

    SysMenu getMenuById(Integer id);


    Map<String,String> update(SysMenu sysMenu);

    Map<String,String> del(List<Integer> idlist);
    List<SysRoleMenu> getRoleMenusByRoleId(Integer roleId);

    List<SysMenu> getMenusByUserName(String currentUsername);

}
