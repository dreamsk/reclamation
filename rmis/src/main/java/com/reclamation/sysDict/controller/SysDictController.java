package com.reclamation.sysDict.controller;

import com.alibaba.fastjson.JSONObject;
import com.reclamation.sysDict.domain.SysDict;
import com.reclamation.sysDict.service.SysDictService;
import com.reclamation.utils.DataTables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("sysDict")
public class SysDictController {
    @Autowired
    HttpServletRequest request;
    @Autowired
    SysDictService sysDictService;

    /**
     * 分页查询
     */
    @RequestMapping(value = "/getPageList",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getPageList(){
        DataTables dt = DataTables.getInstance(request, null);
        return  JSONObject.toJSONString(sysDictService.getPageList(dt));

    }

    @RequestMapping(value = "/add",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String add(SysDict sysDict){

        return  JSONObject.toJSONString(sysDictService.add(sysDict));

    }

    @RequestMapping(value = "/getDictById",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getDictById(Integer id){

        return  JSONObject.toJSONString(sysDictService.getDictById(id));

    }

    @RequestMapping(value = "/update",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String update(SysDict sysDict){

        return  JSONObject.toJSONString(sysDictService.update(sysDict));

    }

    @RequestMapping(value = "/del",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String del(@RequestParam("idlist[]") List<Integer> idlist){

        return  JSONObject.toJSONString(sysDictService.del(idlist));
    }

    @RequestMapping(value = "/selectAll",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String selectAll(String dict_tabname){

        return  JSONObject.toJSONString(sysDictService.selectAll(dict_tabname));
    }
}
