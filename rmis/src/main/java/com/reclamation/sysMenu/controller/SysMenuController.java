package com.reclamation.sysMenu.controller;

import com.alibaba.fastjson.JSONObject;
import com.reclamation.sysMenu.domain.SysMenu;
import com.reclamation.sysMenu.service.SysMenuService;
import com.reclamation.sysRoleMenu.domain.SysRoleMenu;
import com.reclamation.sysUser.domain.SysUser;
import com.reclamation.utils.DataTables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/sysMenu")
public class SysMenuController {
    @Autowired
    SysMenuService sysMenuService;

    @Autowired
    HttpServletRequest request;

    /**
     * 分页加载列表
     * @return
     */
    @RequestMapping(value = "/getPageList",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getPageList(){
        DataTables dt = DataTables.getInstance(request, null);
        return  JSONObject.toJSONString(sysMenuService.getPageList(dt));

    }

    /**
     * 添加菜单
     * @return
     */
    @RequestMapping(value = "/add",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String add(SysMenu sysMenu){
        SysUser sysUser= (SysUser) request.getSession().getAttribute("current_user");
        sysMenu.setCreateId(sysUser.getId());
        sysMenu.setCreateTime(new Date());
        sysMenu.setUpdateTime(new Date());
        return  JSONObject.toJSONString(sysMenuService.add(sysMenu));

    }

    /**
     * 树形结构
     * @return
     */
    @RequestMapping(value = "/selectAll",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String selectAll(Integer id){
        //查询所有的菜单
        List<SysMenu> menus = sysMenuService.selectAll();
        if(id != null){
            //根据角色id查询下属的菜单
            List<SysRoleMenu> sysRoleMenus = sysMenuService.getRoleMenusByRoleId(id);
            //如果id有值将check属性改为true
            for (SysRoleMenu srm : sysRoleMenus
                 ) {
                for (SysMenu menu : menus
                     ) {
                       if(srm.getMenuid() == menu.getId()){
                           menu.setCheck(true);
                       }
                }
            }
        }
        return  JSONObject.toJSONString(menus);

    }
    /**
     * 修改菜单
     * 先进行查询后更新数据
     */
    @RequestMapping(value = "/getMenuById",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getMenuById(Integer id){
        return  JSONObject.toJSONString(sysMenuService.getMenuById(id));

    }
    @RequestMapping(value = "/update",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String update(SysMenu sysMenu){
        SysUser sysUser= (SysUser) request.getSession().getAttribute("current_user");
        sysMenu.setUpdateId(sysUser.getId());
        sysMenu.setUpdateTime(new Date());
        return  JSONObject.toJSONString(sysMenuService.update(sysMenu));
    }
    /**
     * 删除菜单
     */
    @RequestMapping(value = "/del",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String del(@RequestParam("idlist[]") List<Integer> idlist){

        return  JSONObject.toJSONString(sysMenuService.del(idlist));
    }



}
