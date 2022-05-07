package com.reclamation.sysRole.controller;

import com.alibaba.fastjson.JSONObject;
import com.reclamation.sysRole.domain.SysRole;
import com.reclamation.sysRole.service.SysRoleService;
import com.reclamation.sysUser.domain.SysUser;
import com.reclamation.utils.DataTables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/sysRole")
public class SysRoleController {
    @Autowired
    SysRoleService sysRoleService;

    @Autowired
    HttpServletRequest request;

    /**
     * 分页
     * @return
     */
    @RequestMapping(value = "/getPageList" , produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getPageList(){
        DataTables dataTables = DataTables.getInstance(request, null);
        return JSONObject.toJSONString(sysRoleService.getPageList(dataTables));
    }

    /**
     * 新增角色
     * @return
     */
    @RequestMapping(value = "/add" , produces = "application/json;charset=utf-8")
    @ResponseBody
    public String add(SysRole sysRole,@RequestParam("menuIds") String menuIds){
        SysUser sysUser= (SysUser) request.getSession().getAttribute("current_user");
        sysRole.setCreateId(sysUser.getId());
        sysRole.setCreateTime(new Date());
        sysRole.setUpdateTime(new Date());
        return JSONObject.toJSONString(sysRoleService.add(sysRole,menuIds));

    }

    /**
     * 删除角色
     */
    @RequestMapping(value = "/del",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String del(@RequestParam("idlist[]") List<Integer> idlist){

        return  JSONObject.toJSONString(sysRoleService.del(idlist));
    }
    /**
     * 修改角色
     */

    @RequestMapping(value = "/getRoleById",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getRoleById(Integer id){

        return  JSONObject.toJSONString(sysRoleService.getRoleById(id));
    }

    @RequestMapping(value = "/update" , produces = "application/json;charset=utf-8")
    @ResponseBody
    public String update(SysRole sysRole,@RequestParam("menuIds") String menuIds){
        SysUser sysUser= (SysUser) request.getSession().getAttribute("current_user");
        sysRole.setUpdateId(sysUser.getId());
        sysRole.setUpdateTime(new Date());

        return JSONObject.toJSONString(sysRoleService.update(sysRole,menuIds));

    }
    @RequestMapping(value = "/selectAll" , produces = "application/json;charset=utf-8")
    @ResponseBody
    public String selectAll(){

        return JSONObject.toJSONString(sysRoleService.selectAll());

    }

}
