package com.reclamation.area.controller;

import com.alibaba.fastjson.JSONObject;
import com.reclamation.area.service.AreaService;
import com.reclamation.utils.DataTables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/area")
public class AreaController {
    @Autowired
    AreaService areaService;

    @RequestMapping(value = "/getAreas",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getAreas(){

        return  JSONObject.toJSONString(areaService.getAreas());

    }

}
