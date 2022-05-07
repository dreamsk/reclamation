package com.reclamation.base;

import java.util.List;

import org.apache.ibatis.mapping.ResultMap;
import org.apache.ibatis.mapping.ResultMapping;
import org.apache.ibatis.session.SqlSessionFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

public abstract class BaseService {

    Logger logger = LoggerFactory.getLogger(BaseService.class);

    @Autowired
    SqlSessionFactory sessionFactory; // myBatis核心工厂

    /**
     *
     * @Title propertyToColumn
     * @Description property转Column
     *
     *
     * @since 2016年10月20日 下午9:40:13
     *
     * @param property
     * @return String
     */
    @SuppressWarnings("rawtypes")
    public String propertyToColumn(Class clazz, String property) {
        if (property == null || property.equals("")) {
            return null;
        }
        //得到对应实体类的id为clazz.getName()+ ".BaseResultMap"的resultmap的id
        String resultMapId = clazz.getName() + ".BaseResultMap";

        ResultMap resultMap = sessionFactory.getConfiguration().getResultMap(resultMapId);
        if (null == resultMap) {
            logger.error("resultMap 对象为空");
            return null;
        }

        List<ResultMapping> resultMappings = resultMap.getResultMappings();

        if (null == resultMappings) {
            logger.error("resultMappings 对象为空");
            return null;
        }

        Object[] resultMapping = resultMappings.stream().filter(map -> property.equals(map.getProperty())).map(ResultMapping::getColumn).toArray();

        if (resultMapping.length < 1) {
            return null;
        } else {
            return resultMapping[0].toString();
        }
    }
}
