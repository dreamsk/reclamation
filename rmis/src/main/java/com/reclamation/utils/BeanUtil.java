package com.reclamation.utils;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.BeansException;
import org.springframework.beans.FatalBeanException;
import org.springframework.util.Assert;

/**
 * 
 * 描 述:合并实体类，copy实体改变的部分到另一个实体内 
 * 
 * 创建时间： 2016年6月6日 上午10:27:23 
 * 版 本：1.0
 */
public class BeanUtil extends org.springframework.beans.BeanUtils {

	public static void copyProperties(Object source, Object target) throws BeansException {
		Assert.notNull(source, "Source must not be null");
		Assert.notNull(target, "Target must not be null");
		Class<?> actualEditable = target.getClass();
		PropertyDescriptor[] targetPds = getPropertyDescriptors(actualEditable);
		for (PropertyDescriptor targetPd : targetPds) {
			if (targetPd.getWriteMethod() != null) {
				PropertyDescriptor sourcePd = getPropertyDescriptor(source.getClass(), targetPd.getName());
				if (sourcePd != null && sourcePd.getReadMethod() != null) {
					try {
						Method readMethod = sourcePd.getReadMethod();
						if (!Modifier.isPublic(readMethod.getDeclaringClass().getModifiers())) {
							readMethod.setAccessible(true);
						}
						Object value = readMethod.invoke(source);
						// 这里判断以下value是否为空 当然这里也能进行一些特殊要求的处理 例如绑定时格式转换等等
						if (value != null) {
							Method writeMethod = targetPd.getWriteMethod();
							if (!Modifier.isPublic(writeMethod.getDeclaringClass().getModifiers())) {
								writeMethod.setAccessible(true);
							}
							writeMethod.invoke(target, value);
						}
					} catch (Throwable ex) {
						throw new FatalBeanException("Could not copy properties from source to target", ex);
					}
				}
			}
		}
	}

	/**
	 * 将Object对象转成Map<String,Object> String 对象属性名，Object 对象属性值
	 * @param object
	 * 
	 * @return
	 */
	public static Map<String,Object> getAllProperties(Object target) {
		Map<String, Object> map = new HashMap<String, Object>();
		Assert.notNull(target, "Target must not be null");
		Class<?> actualEditable = target.getClass();
		PropertyDescriptor[] targetPds = getPropertyDescriptors(actualEditable);
		for (PropertyDescriptor targetPd : targetPds) {
			if (targetPd.getReadMethod()!=null) {
				try {
					Method readMethod = targetPd.getReadMethod();
					if (!Modifier.isPublic(readMethod.getDeclaringClass().getModifiers())) {
						readMethod.setAccessible(true);
					}
					Object value = readMethod.invoke(target);
					if (value != null) {
						map.put(targetPd.getName(), value);
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return map;
	}
}
