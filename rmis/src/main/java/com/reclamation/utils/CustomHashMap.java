package com.reclamation.utils;

import java.util.HashMap;

/**
 * 
 * @ClassName CustomHashMap
 * @Description 自定义hashMap
 *
 * 
 * @since 2016年10月23日 下午1:48:11
 *
 */
public class CustomHashMap extends HashMap<String, Object> {

	private static final long serialVersionUID = -2968772844807564411L;

	@Override
	public CustomHashMap put(String key, Object value) {
		super.put(key, value);
		return this;
	}
}