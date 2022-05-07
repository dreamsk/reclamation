package com.reclamation.shiro.realm;

import com.reclamation.sysMenu.domain.SysMenu;
import com.reclamation.sysMenu.service.SysMenuService;
import com.reclamation.sysUser.domain.SysUser;
import com.reclamation.sysUser.service.SysUserService;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;

public class MyShiroRealm extends AuthorizingRealm {
        @Autowired
        SysUserService sysUserService;
        @Autowired
        SysMenuService sysMenuService;
    /**
     * 访问链接的时候加载用户的角色和权限
     * @param principalCollection
     * @return
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        //得到登录用户的用户名
        String currentUsername = (String) super.getAvailablePrincipal(principalCollection);
        //根据用户名可以得到当前登录用户的角色和菜单权限
        List<SysMenu> menus = sysMenuService.getMenusByUserName(currentUsername);
        /**
         * 在shiro中
         * 角色role和数据库的role对应
         * permission和数据库的menu对应
         */
        List<String> roleList = new ArrayList<String>();
        List<String> permisssionList = new ArrayList<String>();
        //遍历menu将urlkey放到shiro的权限集合中
        for (SysMenu menu: menus
             ) {
            permisssionList.add(menu.getUrlkey());
        }

        //把用户的角色集合和权限集合放到AuthorizationInfo对象中并返回
        SimpleAuthorizationInfo authorizationInfo = new SimpleAuthorizationInfo();
        authorizationInfo.addRoles(roleList);
        authorizationInfo.addStringPermissions(permisssionList);


        return authorizationInfo;
    }

    /**
     * 用户的验证  是否登录
     * @param authcToken
     * @return
     * @throws AuthenticationException
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authcToken) throws AuthenticationException {
        //把登录controller中的currentUser.login(token);放的token拿出来
        UsernamePasswordToken token = (UsernamePasswordToken) authcToken;
        String username = token.getUsername();//得到用户名
        //根据用户名查询用户
        SysUser user = sysUserService.getUserByName(username);
        AuthenticationInfo authcInfo = null;
        if(user != null){
            authcInfo = new SimpleAuthenticationInfo(user.getUsername(),user.getPassword(),this.getName());
        }
        return authcInfo;
    }
}
