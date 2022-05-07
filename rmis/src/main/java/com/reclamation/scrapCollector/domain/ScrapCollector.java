package com.reclamation.scrapCollector.domain;

import java.util.Date;

public class ScrapCollector {
    private Integer id;

    private String name;

    private String sex;
    private String sexval;
    private String housingEstate;

    private String tel;

    private String housingEstateCode;

    private String openid;
    private String idCard;

    private Long income;

    private Date createTime;
    private String provinceCode;

    private String cityCode;

    private String provinceName;

    public String getProvinceCode() {
        return provinceCode;
    }

    public void setProvinceCode(String provinceCode) {
        this.provinceCode = provinceCode;
    }

    public String getCityCode() {
        return cityCode;
    }

    public void setCityCode(String cityCode) {
        this.cityCode = cityCode;
    }

    public String getProvinceName() {
        return provinceName;
    }

    public void setProvinceName(String provinceName) {
        this.provinceName = provinceName;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }

    public String getSexval() {
        return sexval;
    }

    public void setSexval(String sexval) {
        this.sexval = sexval;
    }

    public String getHousingEstate() {
        return housingEstate;
    }

    public void setHousingEstate(String housingEstate) {
        this.housingEstate = housingEstate;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex == null ? null : sex.trim();
    }


    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel == null ? null : tel.trim();
    }

    public String getHousingEstateCode() {
        return housingEstateCode;
    }

    public void setHousingEstateCode(String housingEstateCode) {
        this.housingEstateCode = housingEstateCode == null ? null : housingEstateCode.trim();
    }

    public String getOpenid() {
        return openid;
    }

    public void setOpenid(String openid) {
        this.openid = openid == null ? null : openid.trim();
    }

    public Long getIncome() {
        return income;
    }

    public void setIncome(Long income) {
        this.income = income;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}