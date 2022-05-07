package com.reclamation.housingEstate.controller;

import com.alibaba.fastjson.JSONObject;
import com.reclamation.housingEstate.domain.HousingEstate;
import com.reclamation.housingEstate.service.HousingEstateService;
import com.reclamation.utils.DataTables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@Controller
@RequestMapping("/housingEstate")
public class HousingEstateController {
    @Autowired
    HttpServletRequest request;

    @Autowired
    HousingEstateService housingEstateService;

    @RequestMapping(value = "/getPageList",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getPageList(){
        DataTables dt = DataTables.getInstance(request, null);
        return  JSONObject.toJSONString(housingEstateService.getPageList(dt));

    }
    @RequestMapping(value = "/add",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String add(HousingEstate housingEstate){

        return  JSONObject.toJSONString(housingEstateService.add(housingEstate));

    }
    @RequestMapping(value = "/getHousingEstateById",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getHousingEstateById(Integer id){

        return  JSONObject.toJSONString(housingEstateService.getHousingEstateById(id));

    }
    @RequestMapping(value = "/update",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String update(HousingEstate housingEstate){

        return  JSONObject.toJSONString(housingEstateService.update(housingEstate));

    }

    @RequestMapping(value = "/del",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String del(@RequestParam("idlist[]") List<Integer> idlist){

        return  JSONObject.toJSONString(housingEstateService.del(idlist));
    }

    @RequestMapping(value = "/getHousingEstateByCityCode",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getHousingEstateByCityCode(String cityCode){

        return  JSONObject.toJSONString(housingEstateService.getHousingEstateByCityCode(cityCode));
    }


}
