package com.reclamation.sysUser.controller;

import com.alibaba.fastjson.JSONObject;
import com.reclamation.sysUser.domain.SysUser;
import com.reclamation.sysUser.service.SysUserService;
import com.reclamation.utils.DataTables;
import com.reclamation.utils.GeneratorValidateCode;
import com.reclamation.utils.MD5Tools;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/sysUser")
public class SysUserController {
    @Autowired
    SysUserService sysUserService;
    @Autowired
    HttpServletRequest request;

    /**
     * 生成验证码图片
     * @param response
     * @return
     */
    @RequestMapping(value = "/getValidateCode", method = RequestMethod.GET)
    @ResponseBody
    public String getValidateCode(HttpServletResponse response) {
        // 设置响应的类型格式为图片格式
        response.setContentType("image/jpeg");
        // 禁止图像缓存。
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);
        GeneratorValidateCode instance = new GeneratorValidateCode();

         request.getSession().setAttribute("ValidateCode", instance.getCode());
//        request.getSession().setAttribute("ValidateCode", "1234");

        try {
            instance.write(response.getOutputStream());
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
    /**
     * 登录
     */
    @RequestMapping("/login")
    @ResponseBody
    public String login(String username,String password,String ValidateCode){
        System.out.println(username+","+password+","+ValidateCode);
        String sessionVCode= (String) request.getSession().getAttribute("ValidateCode");
        //验证码不匹配
        if(!ValidateCode.equals(sessionVCode)){
            return "false_ValidateCode";
        }
        SysUser user = sysUserService.selectByNameAndPwd(username, MD5Tools.MD5(password));
        //user为空,返回用户名或者密码错误
        if(user == null){
            return "false";
        }
        //在数据库中查询用户  如果存在就登录成功并且把用户名密码记录在shiro中
        UsernamePasswordToken token = new UsernamePasswordToken(username, MD5Tools.MD5(password));
        token.setRememberMe(true);
        Subject currentUser = SecurityUtils.getSubject();
        currentUser.login(token);

        request.getSession().setAttribute("current_user", user);
        return "true";
    }

    @RequestMapping(value = "/getPageList" , produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getPageList(){
        DataTables dataTables = DataTables.getInstance(request, null);
        return JSONObject.toJSONString(sysUserService.getPageList(dataTables));
    }

    @RequestMapping(value = "/add" , produces = "application/json;charset=utf-8")
    @ResponseBody
    public String add(SysUser sysUser){
        //加密
        String pwd = MD5Tools.MD5(sysUser.getPassword());
        SysUser user= (SysUser) request.getSession().getAttribute("current_user");
        sysUser.setCreateId(user.getId());
        sysUser.setPassword(pwd);
        sysUser.setCreateTime(new Date());
        sysUser.setUpdateTime(new Date());

        return JSONObject.toJSONString(sysUserService.add(sysUser));
    }

    @RequestMapping(value = "/getUserById" , produces = "application/json;charset=utf-8")
    @ResponseBody
    public String getUserById(Integer id){

        return JSONObject.toJSONString(sysUserService.getUserById(id));
    }

    @RequestMapping(value = "/update" , produces = "application/json;charset=utf-8")
    @ResponseBody
    public String update(SysUser sysUser){
        //加密
        String pwd = MD5Tools.MD5(sysUser.getPassword());
        SysUser user= (SysUser) request.getSession().getAttribute("current_user");
        sysUser.setUpdateTime(new Date());
        sysUser.setPassword(pwd);
        sysUser.setUpdateId(user.getId());

        return JSONObject.toJSONString(sysUserService.update(sysUser));
    }

    @RequestMapping(value = "/del",produces = "application/json;charset=utf-8")
    @ResponseBody
    public String del(@RequestParam("idlist[]") List<Integer> idlist){

        return  JSONObject.toJSONString(sysUserService.del(idlist));
    }

    @RequestMapping(value = "/logout")
    public String logout(){

        SecurityUtils.getSubject().logout();
        return "login";
    }


}
