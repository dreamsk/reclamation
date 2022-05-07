package com.reclamation.scrap.controller;

import com.alibaba.fastjson.JSONObject;
import com.reclamation.scrap.domain.Scrap;
import com.reclamation.scrap.service.ScrapService;
import com.reclamation.utils.DataTables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/scrap")
public class ScrapController {
    @Autowired
    HttpServletRequest request;
    @Autowired
    ScrapService scrapService;

    @RequestMapping(value = "/getPageList",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getPageList(){
        DataTables dt = DataTables.getInstance(request, null);
        return  JSONObject.toJSONString(scrapService.getPageList(dt));

    }

    @RequestMapping(value = "/add",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String add(Scrap scrap){

        return  JSONObject.toJSONString(scrapService.add(scrap));

    }
    @RequestMapping(value = "/getScrapById",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getScrapById(Integer id){

        return  JSONObject.toJSONString(scrapService.getScrapById(id));

    }
    @RequestMapping(value = "/update",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String update(Scrap scrap){

        return  JSONObject.toJSONString(scrapService.update(scrap));
    }

    @RequestMapping(value = "/del",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String del(@RequestParam("idlist[]") List<Integer> idlist){

        return  JSONObject.toJSONString(scrapService.del(idlist));
    }
}
