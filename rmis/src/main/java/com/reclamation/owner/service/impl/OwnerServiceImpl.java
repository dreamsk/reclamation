package com.reclamation.owner.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.reclamation.base.BaseService;
import com.reclamation.mapper.OwnerMapper;
import com.reclamation.mapper.SysMenuMapper;
import com.reclamation.owner.domain.Owner;
import com.reclamation.owner.service.OwnerService;
import com.reclamation.sysMenu.domain.SysMenu;
import com.reclamation.utils.DataTables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

@Service
public class OwnerServiceImpl extends BaseService implements OwnerService {
    @Autowired
    OwnerMapper ownerMapper;

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
            String column =  propertyToColumn(OwnerMapper.class,property);
            if(!StringUtils.isEmpty(column)){
                //参数排序
                PageHelper.orderBy(column + " "+dataTables.getOrder());
            }
        }
        List<Owner> menus = ownerMapper.getPageList(dataTables.getSearch(),dataTables.getSubSQL());
        //pageinfo完成分页处理
        PageInfo<Owner> pageInfo = new PageInfo<Owner>(menus);
        List<Owner> data = new ArrayList<Owner>();
        if(pageInfo.getList() != null){
            data = pageInfo.getList();//分页结果集
        }
        //把数据封装回dataTables
        dataTables.setRecordsTotal(pageInfo.getTotal());
        dataTables.setRecordsFiltered(pageInfo.getTotal());
        dataTables.setData(data);

        return dataTables;
    }
}
