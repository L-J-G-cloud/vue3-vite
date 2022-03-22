// import Vue from 'vue'
import { i18nText} from '../plugins/i18n'
import  moment from 'moment'
export function isPc() {
  return !navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
}

export function isIos() {
  return navigator.userAgent.match(/(iPhone|iPod|ios|iPad|)/i)
}

export function isAndroid() {
  return navigator.userAgent.match(/(Android)/i)
}

export function isBitKeep() {
  return navigator.userAgent.match(/(BitKeep)/i)
}

export function isWechat() {
  return navigator.userAgent.match(/(MicroMessenger)/i)
}

/*
  浮点数截取位数精度
  参数 _float 取药处理的浮点数
      _decimal精度位数

  区别toFixed, toFixed会四舍五入
*/
export function tofixedWithEndPad(_float, _decimal) {
  if (!_float) {
    console.warn('num is required')
    return '0'
  }
  // let intLength = parseInt(String(_float)).toString().length
  let u=Math.pow(10,_decimal)

  let resNum=Math.floor(Number(_float)*u)/u

  //处理小数位数不足的情况
  let strResNumArr=String(resNum).split('.')
  
  let decimalDidget=strResNumArr[1] && strResNumArr[1].length ? strResNumArr[1].length :0 

  let decimalDidgetStr=(strResNumArr[1]?strResNumArr[1]:'') + (String(Math.pow(10,_decimal-decimalDidget)).slice(1))

  return strResNumArr[0]+'.'+decimalDidgetStr
}

//根据不同的时区转换
export function getdata(launchStartTimeStamp){
  
  var offset = new Date() + "";     //将时间格式转为字符串
  console.log(offset);  //  Mon Nov 02 2020 20:57:20 GMT-0600 (北美中部标准时间)
  let GMTAfter = offset.indexOf('GMT'); //拿到这个-0600也就是当前所在时区，然后转时间戳的
  let current_time = offset.substring(GMTAfter+3,GMTAfter+8);;   //-0600    给了你定义的一个字段，在拿到数据后使用 
  let time = moment(launchStartTimeStamp).utcOffset(current_time).format('YYYY-MM-DD');
  let timeDetail = moment(launchStartTimeStamp).utcOffset(current_time).format('YYYY-MM-DD HH:mm:ss');
  let day = moment(time).day()
  switch(day){
    case 0: day = i18nText('Sunday');break;
    case 1: day = i18nText('Monday');break;
    case 2: day = i18nText('Tuesday');break;
    case 3: day = i18nText('Wednesday');break;
    case 4: day = i18nText('Thursday');break;
    case 5: day = i18nText('Friday');break;
    case 6: day = i18nText('Saturday');break;
    default:return ''
  }
  day = day + ' ';
  let nys = time.split('-');
  let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  let month = months.find((item,index)=>nys[1]==(index+1))
  let years = nys[0];
  let daily = nys[2];
  let cnmonth = nys[1];
  let sfm = timeDetail.split('')[1]
  return {day,time,timeDetail,month,years,daily,sfm,cnmonth};
}

//产生一个特定位数的0-9的随机数
export function getGeRandow(digit){
  var sourceStr="0,1,2,3,4,5,6,7,8,9";
  let arrStr=sourceStr.split(",");
	var result=""; //定义变量并初始化
	var index=0;
	for(let i=0;i<digit;i++){
		index=parseInt(Math.random()*arrStr.length);
		result+=arrStr[index];
	}
  return result;
}
   

export function getTimeChou(leftTime){
  var d,h,m,s;  
  if (leftTime>=0) {  
      d = Math.floor(leftTime/1000/60/60/24);  
      h = Math.floor(leftTime/1000/60/60%24);  
      m = Math.floor(leftTime/1000/60%60);  
      s = Math.floor(leftTime/1000%60);                    
  }
  return {Day:d,Hour:h,minute:m,second:s};  
}