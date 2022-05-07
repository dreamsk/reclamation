package com.reclamation.reclamationOrder.controller;

import com.alibaba.fastjson.JSONObject;
import com.reclamation.reclamationOrder.service.ReclamationOrderService;
import com.reclamation.utils.DataTables;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/reclamationOrder")
public class ReclamationOrderController {
    @Autowired
    HttpServletRequest request;
    @Autowired
    ReclamationOrderService reclamationOrderService;

    @RequestMapping(value = "/getPageList",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getPageList(){
        DataTables dt = DataTables.getInstance(request, null);
        return  JSONObject.toJSONString(reclamationOrderService.getPageList(dt));

    }

}
