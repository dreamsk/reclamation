package com.reclamation.area.service.impl;

import com.reclamation.area.domain.Area;
import com.reclamation.area.service.AreaService;
import com.reclamation.mapper.AreaMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AreaServiceImpl implements AreaService {
    @Autowired
    AreaMapper areaMapper;

    @Override
    public List<Area> getAreas() {
        return areaMapper.getAreas();
    }
}
