package com.reclamation.sysUser.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.reclamation.base.BaseService;
import com.reclamation.mapper.SysUserMapper;
import com.reclamation.sysUser.domain.SysUser;
import com.reclamation.sysUser.service.SysUserService;
import com.reclamation.utils.DataTables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SysUserServiceImpl extends BaseService implements SysUserService {
    @Autowired
    SysUserMapper sysUserMapper;
    @Override
    public SysUser selectByNameAndPwd(String username, String password) {
        return sysUserMapper.selectByNameAndPwd(username, password);
    }

    @Override
    public Object getPageList(DataTables dataTables) {
        //分页信息,使用PageHelper
        PageHelper.startPage(dataTables.getStart(), dataTables.getLength());
        //初始排序
        PageHelper.orderBy("sort asc");
        //获取需要排序的字段
        String property = dataTables.getColumn();
        if(!StringUtils.isEmpty(property)){
            //转换为表字段
            String column = propertyToColumn(SysUserMapper.class,property);
            if(!StringUtils.isEmpty(column)){
                PageHelper.orderBy(column + " " + dataTables.getOrder());
            }

        }
        //根据传递参数做模糊查询得到结果集
        List<SysUser> users = sysUserMapper.getPageList(dataTables.getSearch(),dataTables.getSubSQL());
        //完成分页处理
        PageInfo<SysUser> pageInfo=new PageInfo<SysUser>(users);
        List<SysUser> data = new ArrayList<SysUser>();
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
    public Map<String, String> add(SysUser sysUser) {
        int res = sysUserMapper.insertSelective(sysUser);
        Map<String, String> map = new HashMap<String, String>();
        if(res > 0){
            map.put("status", "200");
        }else {
            map.put("status", "999");
        }
        return map;
    }

    @Override
    public SysUser getUserById(Integer id) {
        return sysUserMapper.selectByPrimaryKey(id);
    }

    @Override
    public Map<String, String> update(SysUser sysUser) {
        int res = sysUserMapper.updateByPrimaryKeySelective(sysUser);
        Map<String, String> map = new HashMap<String, String>();
        if(res > 0){
            map.put("status", "200");
        }else {
            map.put("status", "999");
        }
            return map;
    }

    @Override
    public Map<String, String> del(List<Integer> idlist) {
        int res = sysUserMapper.deleteByPrimaryKeys(idlist);
        Map<String, String> map = new HashMap<String, String>();
        if(res > 0){
            map.put("status", "200");
        }else {
            map.put("status", "999");
        }
        return map;
    }

    @Override
    public SysUser getUserByName(String username) {
        return sysUserMapper.getUserByName(username);
    }
}
