package com.reclamation.sysMenu.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.reclamation.base.BaseService;
import com.reclamation.mapper.SysMenuMapper;
import com.reclamation.mapper.SysRoleMenuMapper;
import com.reclamation.sysMenu.domain.SysMenu;
import com.reclamation.sysMenu.service.SysMenuService;
import com.reclamation.sysRoleMenu.domain.SysRoleMenu;
import com.reclamation.utils.DataTables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SysMenuServiceImpl extends BaseService implements SysMenuService {
    @Autowired
    SysMenuMapper sysMenuMapper;

    @Autowired
    SysRoleMenuMapper sysRoleMenuMapper;

    @Override
    public DataTables getPageList(DataTables dataTables) {
        //使用pagehelper实现分页，需要在myBatis-config.xml做配置
        //分页数据  开始页码和数据条数
        PageHelper.startPage(dataTables.getStart(), dataTables.getLength());
        PageHelper.orderBy("sort asc");//初始排序,值是sql的一部分，使用的是表的字段
        //判断dataTables中有没有传来需要排序的字段column
        String property = dataTables.getColumn();
        if(!StringUtils.isEmpty(property)){
        //dataTables.getColumn()拿出来的是实体类的属性,需要转化成表的字段
            //通过对应的mapper.xml的resultmap拿到属性名对应的字段名
            //使用工具类进行转化
            String column =  propertyToColumn(SysMenuMapper.class,property);
            if(!StringUtils.isEmpty(column)){
                //参数排序
                PageHelper.orderBy(column + " "+dataTables.getOrder());
            }
        }
        List<SysMenu> menus = sysMenuMapper.getPageList(dataTables.getSearch(),dataTables.getSubSQL());
        //pageinfo完成分页处理
        PageInfo<SysMenu> pageInfo = new PageInfo<SysMenu>(menus);
        List<SysMenu> data = new ArrayList<SysMenu>();
        if(pageInfo.getList() != null){
            data = pageInfo.getList();//分页结果集
        }
        //把数据封装回dataTables
        dataTables.setRecordsTotal(pageInfo.getTotal());
        dataTables.setRecordsFiltered(pageInfo.getTotal());
        dataTables.setData(data);

        return dataTables;
    }

    @Override
    public Map<String, String> add(SysMenu sysMenu) {
        Map<String, String> map = new HashMap<String, String>();
        int res = sysMenuMapper.insertSelective(sysMenu);
        if(res == 1){
            map.put("status", "200");
        }else {
            map.put("status", "999");
        }
        return map;
    }

    @Override
    public List<SysMenu> selectAll() {
        return sysMenuMapper.selectAll();
    }

    @Override
    public SysMenu getMenuById(Integer id) {
        return sysMenuMapper.selectByPrimaryKey(id);
    }

    @Override
    public Map<String, String> update(SysMenu sysMenu) {
        Map<String, String> map = new HashMap<String, String>();
        int res = sysMenuMapper.updateByPrimaryKeySelective(sysMenu);
        if(res == 1){
            map.put("status", "200");
        }else {
            map.put("status", "999");
        }
        return map;
    }

    @Override
    public Map<String, String> del(List<Integer> idlist) {
        Map<String, String> map = new HashMap<String, String>();
        int res = sysMenuMapper.deleteByPrimaryKeys(idlist);
        if(res > 0){
            map.put("status", "200");
        }else {
            map.put("status", "999");
        }
        return map;
    }

    @Override
    public List<SysRoleMenu> getRoleMenusByRoleId(Integer roleId) {
        return sysRoleMenuMapper.getRoleMenusByRoleId(roleId);
    }

    @Override
    public List<SysMenu> getMenusByUserName(String currentUsername) {

        return sysMenuMapper.getMenusByUserName(currentUsername);
    }
}
