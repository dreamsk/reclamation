package com.reclamation.sysRole.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.reclamation.base.BaseService;
import com.reclamation.mapper.SysRoleMapper;
import com.reclamation.mapper.SysRoleMenuMapper;
import com.reclamation.sysRole.domain.SysRole;
import com.reclamation.sysRole.service.SysRoleService;
import com.reclamation.utils.DataTables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SysRoleServiceImpl extends BaseService implements SysRoleService {
    @Autowired
    SysRoleMapper sysRoleMapper;
    @Autowired
    SysRoleMenuMapper sysRoleMenuMapper;

    @Override
    public DataTables getPageList(DataTables dataTables) {
        //分页信息,使用pagehelper
        PageHelper.startPage(dataTables.getStart(), dataTables.getLength());
        //初始排序
        PageHelper.orderBy("sort asc");
        //获取需要排序的字段
        String property = dataTables.getColumn();
        if(!StringUtils.isEmpty(property)){
            //转换为表字段
            String column = propertyToColumn(SysRoleMapper.class,property);
            if(!StringUtils.isEmpty(column)){
                PageHelper.orderBy(column + " " + dataTables.getOrder());
            }

        }
        //根据传递参数做模糊查询得到结果集
        List<SysRole> roles = sysRoleMapper.getPageList(dataTables.getSearch(),dataTables.getSubSQL());
        //完成分页处理
        PageInfo<SysRole> pageInfo=new PageInfo<SysRole>(roles);
        List<SysRole> data = new ArrayList<SysRole>();
        if(pageInfo.getList() != null){
                data = pageInfo.getList();
        }
        //封装结果集返回
        dataTables.setRecordsTotal(pageInfo.getTotal());
        dataTables.setRecordsFiltered(pageInfo.getTotal());
        dataTables.setData(data);


        return dataTables;
    }

    @Override
    public Map<String, String> add(SysRole sysRole, String menuIds) {
        List<Integer> ids = new ArrayList<Integer>();
        String[] strs = menuIds.split(",");
        for (String s: strs
             ) {
                ids.add(Integer.valueOf(s));
        }
        int res = sysRoleMapper.insertSelective(sysRole);
        Map<String, String> map = new HashMap<String, String>();
        if(res > 0){
            //如果角色添加成功，保存角色与菜单的关联关系
            sysRoleMenuMapper.addRoleAndMenus(sysRole.getId(), ids);
            map.put("status", "200");
        }else {
            map.put("status", "999");
        }
        return map;
    }

    @Override
    public Map<String, String> del(List<Integer> idlist) {
        //1.删除角色本身 2.删除角色关联表
        int res = sysRoleMapper.deleteByPrimaryKeys(idlist);
        Map<String, String> map = new HashMap<String, String>();
        if(res > 0){
            sysRoleMenuMapper.deleteByRoleIds(idlist);
            map.put("status", "200");
        }else {
            map.put("status", "999");
        }
        return map;
    }

    @Override
    public SysRole getRoleById(Integer id) {
        return sysRoleMapper.selectByPrimaryKey(id);
    }

    @Override
    public Map<String, String> update(SysRole sysRole, String menuIds) {
        //1.根据sysrole来修改角色数据 2 修正下属菜单 删除关联关系 重新赋值

        int res = sysRoleMapper.updateByPrimaryKeySelective(sysRole);
        Map<String, String> map = new HashMap<String, String>();
        if(res > 0){
            //如果角色更新成功，先删除角色与菜单的关联关系
           int res1 =  sysRoleMenuMapper.deleteByRoleId(sysRole.getId());
           if(res1 > 0){
               List<Integer> ids = new ArrayList<Integer>();
               String[] strs = menuIds.split(",");
               for (String s: strs
               ) {
                   ids.add(Integer.valueOf(s));
               }

               sysRoleMenuMapper.addRoleAndMenus(sysRole.getId(), ids);
           }
            map.put("status", "200");
        }else {
            map.put("status", "999");
        }
        return map;

    }

    @Override
    public List<SysRole> selectAll() {
        return sysRoleMapper.selectAll();
    }
}
