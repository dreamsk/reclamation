package com.reclamation.scrapCollector.controller;

import com.alibaba.fastjson.JSONObject;
import com.reclamation.scrapCollector.domain.ScrapCollector;
import com.reclamation.scrapCollector.service.ScrapCollectorService;
import com.reclamation.sysMenu.domain.SysMenu;
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
@RequestMapping("scrapCollector")
public class ScrapCollectorController {
    @Autowired
    HttpServletRequest request;
    @Autowired
    ScrapCollectorService scrapCollectorService;

    @RequestMapping(value = "/getPageList",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getPageList(){
        DataTables dt = DataTables.getInstance(request, null);
        return  JSONObject.toJSONString(scrapCollectorService.getPageList(dt));

    }

    @RequestMapping(value = "/add",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String add(ScrapCollector scrapCollector){
        scrapCollector.setCreateTime(new Date());
        return  JSONObject.toJSONString(scrapCollectorService.add(scrapCollector));

    }
    @RequestMapping(value = "/getScrapCollectorById",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getScrapCollectorById(Integer id){
        return  JSONObject.toJSONString(scrapCollectorService.getScrapCollectorById(id));

    }

    @RequestMapping(value = "/update",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String update(ScrapCollector scrapCollector){
        scrapCollector.setCreateTime(new Date());
        return  JSONObject.toJSONString(scrapCollectorService.update(scrapCollector));

    }

    @RequestMapping(value = "/del",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String del(@RequestParam("idlist[]") List<Integer> idlist){

        return  JSONObject.toJSONString(scrapCollectorService.del(idlist));
    }

}
