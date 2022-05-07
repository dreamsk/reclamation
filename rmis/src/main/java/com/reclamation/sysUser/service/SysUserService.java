package com.reclamation.sysUser.service;

import com.reclamation.sysUser.domain.SysUser;
import com.reclamation.utils.DataTables;

import java.util.List;
import java.util.Map;

public interface SysUserService {
    SysUser selectByNameAndPwd(String username, String password);


    Object getPageList(DataTables dataTables);

    Map<String,String> add(SysUser sysUser);

    SysUser getUserById(Integer id);

    Map<String,String> update(SysUser sysUser);

    Map<String,String> del(List<Integer> idlist);

    SysUser getUserByName(String username);
}
