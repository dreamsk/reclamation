package com.reclamation.utils;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

/**
 * 时间工具类
 * 
 * @since 2016年9月24日 下午10:48:15
 */
public class DateUtil {

	/**
	 * yyyy-MM
	 */
	public static final String MONTH_MIN = "yyyy-MM";

	/**
	 * yyyy-MM-dd
	 */
	public static final String DAY_MIN = "yyyy-MM-dd";

	/**
	 * yyyy-MM-dd HH:mm:ss
	 */
	public static final String DATE_MIN = "yyyy-MM-dd HH:mm:ss";

	/**
	 * 获取当前时间
	 * 
	 * @param date
	 * @param formatIn
	 * @return
	 */
	public static Timestamp getNewTimestampDate() {
		return new Timestamp(new Date().getTime());
	}

	/**
	 * 将时间字符串格式化 默认格式为yyyy-MM-dd HH:mm:ss
	 * 
	 * @param date
	 * @param formatIn
	 * @return
	 */
	public static String formaterDateString(String date, String formatIn) {
		try {
			Date d = new SimpleDateFormat(formatIn).parse(date);
			return new SimpleDateFormat(DATE_MIN).format(d);
		} catch (ParseException e) {
			return null;
		}
	}

	/**
	 * 将时间字符串按指定格式格式化
	 * 
	 * @param date
	 * @param formatIn
	 * @param formatOut
	 * @return
	 */
	public static String formaterDateString(String date, String formatIn, String formatOut) {
		try {
			Date d = new SimpleDateFormat(formatIn).parse(date);
			return new SimpleDateFormat(formatOut).format(d);
		} catch (ParseException e) {
			return null;
		}
	}

	/**
	 * 根据时间转换成制定格式的字符串
	 * 
	 * @param date
	 * @param format
	 * @return
	 */
	public static String convertDateToString(Date date, String format) {
		try {
			return new SimpleDateFormat(format).format(date);
		} catch (Exception e) {
			return null;
		}
	}

	/**
	 * 把字符串以指定的格式装换成时间对象
	 * 
	 * @param date
	 * @param format
	 * @return
	 */
	public static Date convertStringToDate(String date, String format) {
		try {
			return new SimpleDateFormat(format).parse(date);
		} catch (ParseException e) {
			return null;
		}
	}

	/**
	 * 获取当前日期字符串形式， 默认格式为yyyy-MM-dd HH:mm:ss
	 * 
	 * @return
	 */
	public static String getCurrentDate() {
		return new SimpleDateFormat(DATE_MIN).format(new Date());
	}

	/**
	 * 获取但前时间的前一天
	 * 
	 * @param appDate
	 * @param format
	 * @return
	 */
	public static String getCurrentBefore(Date appDate, String format) {
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		return getFutureDay(sdf.format(appDate), format, -1, 1);
	}

	/**
	 * 指定的时间字符创加上指定的天数 返回一个新时间的字符串形式
	 * 
	 * @param date
	 * @param formate
	 * @param day
	 * @return
	 */
	public static String getNewDateByDay(String date, String formate, int day) {
		return getFutureDay(date, formate, day, 1);
	}

	public static String getNewDateByDay(Date date, String formate, int day) {
		return getFutureDay(convertCurrentDate(date, formate), formate, day, 1);
	}

	/**
	 * 指定的时间字符创加上指定的月份数 返回一个新时间的字符串形式
	 * 
	 * @param date 指定时间
	 * @param formate 指定时间格式
	 * @param month 指定计算的月份数
	 * @return
	 */
	public static String getNewDateByMonth(String date, String formate, int month) {
		return getFutureDay(date, formate, month, 2);
	}

	/**
	 * 获取但前时间的前一天
	 * 
	 * @param appDate`
	 * @param format
	 * @return
	 */
	public static String getCurrentBefore(String appDate, String format) {
		return getFutureDay(appDate, format, -1, 1);
	}

	/**
	 * 获取但前时间的后一天
	 * 
	 * @param appDate
	 * @param format
	 * @return
	 */
	public static String getCurrentAfert(Date appDate, String format) {
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		return getFutureDay(sdf.format(appDate), format, 1, 1);
	}

	/**
	 * 获取但前时间的后一天
	 * 
	 * @param appDate
	 * @param format
	 * @return
	 */
	public static String getCurrentAfert(String appDate, String format) {
		return getFutureDay(appDate, format, 1, 1);
	}

	/**
	 * 获取但前时间的下一月
	 * 
	 * @param appDate
	 * @param format
	 * @return
	 */
	public static String getCurrentAfertMonth(String appDate, String format) {
		return getFutureDay(appDate, format, 1, 2);
	}

	/**
	 * 获取但前时间的前一个月
	 * 
	 * @param appDate
	 * @param format
	 * @return
	 */
	public static String getCurrentBeforeMonth(String appDate, String format) {
		return getFutureDay(appDate, format, -1, 2);
	}

	/**
	 * 时间转换成字符串，自定义格式
	 * 
	 * @param currDate
	 * @param format
	 * @return
	 */
	public static String convertCurrentDate(Date currDate, String format) {
		return new SimpleDateFormat(format).format(currDate);
	}

	/**
	 * 日期 转换成字符串 自带格式 yyyy-MM-dd
	 * 
	 * @param currDate
	 * @return
	 */
	public static String convertCurrentDate(Date currDate) {
		return new SimpleDateFormat(DAY_MIN).format(currDate);
	}

	/**
	 * 时间转换成字符串 自带格式yyyy-MM-dd HH:mm:ss
	 * 
	 * @param currDate
	 * @return
	 */
	public static String convertCurrentTime() {
		return new SimpleDateFormat(DATE_MIN).format(new Date());
	}

	/**
	 * 用于返回指定日期格式的日期增加指定天数的日期
	 * 
	 * @param appDate 指定日期
	 * @param format 指定日期格式
	 * @param days 指定天数
	 * @param type 指定是年 月 日 等等
	 * @return 指定日期格式的日期增加指定天数的日期
	 */
	public static String getFutureDay(String appDate, String format, int num, int type) {
		String future = "";
		try {
			Calendar calendar = GregorianCalendar.getInstance();
			SimpleDateFormat simpleDateFormat = new SimpleDateFormat(format);
			Date date = simpleDateFormat.parse(appDate);
			calendar.setTime(date);
			switch (type) {
			case 1:// 加天
				calendar.add(Calendar.DATE, num);
				break;
			case 2:// 加月
				calendar.add(Calendar.MONTH, num);
				break;
			case 3:// 加年
				calendar.add(Calendar.YEAR, num);
				break;
			case 4:// 时
				calendar.add(Calendar.HOUR, num);
				break;
			case 5:// 分
				calendar.add(Calendar.MINUTE, num);
				break;
			case 6:// 秒
				calendar.add(Calendar.SECOND, num);
				break;
			default:
				break;
			}
			date = calendar.getTime();
			future = simpleDateFormat.format(date);
		} catch (Exception e) {
		}
		return future;
	}

	/**
	 * 根据指定的日期 和指定的天数获得新的日期
	 * 
	 * @param date
	 * @param i 天数为负数时表示前 I 天
	 * @return
	 */
	public String getNextDaysOfTheMonth(Date date, Integer i) {
		Calendar rightNow = Calendar.getInstance();
		// 获得当前的月天数 date为当前日期
		rightNow.setTime(date);

		// 获得明天的日期
		rightNow.add(Calendar.DAY_OF_MONTH, i);

		SimpleDateFormat simpl = new SimpleDateFormat(DAY_MIN);
		String nextdate = simpl.format(rightNow.getTime());
		return nextdate;
	}

	/***
	 * 获得指定月的工作日天数
	 * 
	 * @return
	 */
	public static int getCurrentWorkDay(Date date) {
		return getCurrentMonthDay(date) - getCurrentWeekDay(date);
	}

	/***
	 * 获得指定月的工作日天数
	 * 
	 * @return
	 */
	public static int getCurrentWorkDay(String date) {
		return getCurrentMonthDay(date) - getCurrentWeekDay(date);
	}

	/**
	 * 获得指定月的星期六和星期天数的总天数
	 * 
	 * @param date Date
	 * @return
	 */
	public static int getCurrentWeekDay(Date date) {
		int weekDay = 0;
		Calendar cal = Calendar.getInstance();
		String[] ym = new SimpleDateFormat(MONTH_MIN).format(date).split("-");
		int year = Integer.parseInt(ym[0]);
		int month = Integer.parseInt(ym[1]);
		cal.set(Calendar.YEAR, year);
		cal.set(Calendar.MONTH, month - 1);
		cal.set(Calendar.DATE, 1);
		while (cal.get(Calendar.YEAR) == year && cal.get(Calendar.MONTH) < month) {
			int day = cal.get(Calendar.DAY_OF_WEEK);
			if (day == Calendar.SUNDAY || day == Calendar.SATURDAY) {
				weekDay++;
			}
			cal.add(Calendar.DATE, 1);
		}
		return weekDay;
	}

	/**
	 * 获得指定月的星期六和星期天数的总天数(此方法只支持日期格式为 yyyy-MM-dd)
	 * 
	 * @param date Date 格式为（yyyy-MM-dd）
	 * @return
	 */
	public static int getCurrentWeekDay(String date) {
		int weekDay = 0;
		Calendar cal = Calendar.getInstance();
		String[] ym = date.split("-");
		int year = Integer.parseInt(ym[0]);
		int month = Integer.parseInt(ym[1]);
		cal.set(Calendar.YEAR, year);
		cal.set(Calendar.MONTH, month - 1);
		cal.set(Calendar.DATE, 1);
		while (cal.get(Calendar.YEAR) == year && cal.get(Calendar.MONTH) < month) {
			int day = cal.get(Calendar.DAY_OF_WEEK);
			if (day == Calendar.SUNDAY || day == Calendar.SATURDAY) {
				weekDay++;
			}
			cal.add(Calendar.DATE, 1);
		}

		return weekDay;
	}

	/**
	 * 获取指定月的总的天数
	 * 
	 * @param date 当前的日期 Date
	 * @return 指定月总天数
	 */
	public static int getCurrentMonthDay(Date date) {
		Calendar rightNow = Calendar.getInstance();
		// 获得当前的月天数 date为当前时间
		rightNow.setTime(date);
		// 要计算你想要的月份，改变这里即可
		return rightNow.getActualMaximum(Calendar.DAY_OF_MONTH);
	}

	/**
	 * * 获取当前月的总的天数
	 * 
	 * @param date 当前的月份的字符串
	 * @param fomt 传入的格式
	 * @return 指定月总天数
	 */
	public static int getCurrentMonthDay(String date, String fomt) {
		try {
			Calendar rightNow = Calendar.getInstance();
			// 获得当前的月天数 date为当前时间
			rightNow.setTime(new SimpleDateFormat(fomt).parse(date));
			// 要计算你想要的月份，改变这里即可
			return rightNow.getActualMaximum(Calendar.DAY_OF_MONTH);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	/**
	 * 获取当前月的总的天数
	 * 
	 * @param date 当前的月份的字符串 默认格式为yyyy-MM
	 * @return 指定月总天数
	 */
	public static int getCurrentMonthDay(String date) {
		try {
			Calendar rightNow = Calendar.getInstance();
			// 获得当前的月天数 date为当前时间
			rightNow.setTime(new SimpleDateFormat(MONTH_MIN).parse(date));
			// 要计算你想要的月份，改变这里即可
			return rightNow.getActualMaximum(Calendar.DAY_OF_MONTH);
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	/**
	 * 获得指定日期前N月的月份
	 * 
	 * @param date 指定的日期
	 * @param i 几天 i可为负数
	 * @param format 指定返回格式
	 * @return
	 */
	public static String getCurrentNextMonth(Date date, int i, String format) {
		Calendar nowtime = Calendar.getInstance();
		nowtime.setTime(date);
		nowtime.roll(Calendar.MONTH, i);
		return new SimpleDateFormat(format).format(nowtime.getTime()).toString();
	}

	/**
	 * 获得指定日期上一天N天的日期
	 * 
	 * @param date 指定的日期
	 * @param i 几天 i可为负数
	 * @param format 指定返回时间格式
	 * @return
	 */
	public static String getCurrentNextDate(Date date, int i, String format) {
		Calendar nowtime = Calendar.getInstance();
		nowtime.setTime(date);
		nowtime.roll(Calendar.DATE, i);
		return new SimpleDateFormat(format).format(nowtime.getTime()).toString();
	}

	/**
	 * 计算两个日期之间相隔的天数
	 * 
	 * @param stime 开始时间
	 * @param etime 结束时间
	 * @param format 传入的时间格式
	 * @return 返回两个日期见相隔的天数
	 */
	public static long getCurrentTimeDifference(String stime, String etime, String format) {
		long quot = 0;
		SimpleDateFormat ft = new SimpleDateFormat(format);
		try {
			Date date1 = ft.parse(stime);
			Date date2 = ft.parse(etime);
			quot = date1.getTime() - date2.getTime();
			quot = quot / 1000 / 60 / 60 / 24;
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return quot;
	}

	/**
	 * 获得指定月的开始日期
	 * 
	 * @param date
	 * @return
	 */
	public static String getCurrentStartTime(Date date) {
		return DateUtil.getCurrentNextMonth(date, 0, DAY_MIN);
	}

	/**
	 * 获得指定月的结束日期
	 * 
	 * @return
	 */
	public static String getCurrentEndTime(Date date) {
		SimpleDateFormat simp = new SimpleDateFormat(MONTH_MIN);
		int max = getCurrentMonthDay(date);
		String month = simp.format(date);
		return month + "-" + max;
	}

	/**
	 * 获得指定月的结束日期
	 * 
	 * @return
	 */
	public static String getCurrentEndTime(String date) {
		try {
			int max = getCurrentMonthDay(date);
			return date + "-" + max;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	/***
	 * 获取 当前时间 格式yyyy-MM-dd HH:mm:ss
	 * 
	 * @return
	 */
	public static String getDateNowWithString() {
		SimpleDateFormat sdf = new SimpleDateFormat(DATE_MIN);
		return sdf.format(new Date());
	}
}
