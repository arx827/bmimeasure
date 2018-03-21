var date = JSON.parse(localStorage.getItem('listdata')) || [];
var btn = document.querySelector('.output');
var todolist = document.querySelector('.list');

var height = document.querySelector('#heightInput');
var weight = document.querySelector('#weightInput');

var btnOrign = document.querySelector('.btnOrign');
var btnOrign2 = document.querySelector('.btnOrign2');

UPdate(date);
btn.addEventListener('click',addDate,false);
todolist.addEventListener('click',remove,false)

// 更新list
function UPdate(date){
    str="";
    for(var i=0;i<date.length;i++){
        str+=
            '<li class="border-Color-'+date[i].class+'">\
                <div class="row justify-content-between">\
                    <div class="col-lg col-md-6">'+date[i].content+'</div>\
                    <div class="col-lg col-md-6"><small>BMI</small> '+date[i].BMI+'</div>\
                    <div class="col-lg col-md-6"><small>weight</small> '+date[i].weight+'kg</div>\
                    <div class="col-lg col-md-6"><small>height</small> '+date[i].height+'cm</div>\
                    <div class="col-lg"><small>'+date[i].day+'</small></div>\
                    <div class="col-lg-1 col-md remove"><a data-num="'+i+'" href="#">刪除</a></div>\
                </div>\
            </li>'
    }
    todolist.innerHTML=str; 
}

//刪除
function remove(e){
    e.preventDefault();
    var num = e.target.dataset.num;

    if(e.target.nodeName !== 'A'){return}
    console.log();

    date.splice(num,1);
    localStorage.setItem('listdata',JSON.stringify(date));
    UPdate(date);
}

function addDate(){
    //計算BMI
    H = height.value;
    HM = H / 100;
    var dblh = Math.pow(HM,2);
    W = weight.value;
    //取到小數第num位
    function bmiDigit(num){
        var pow = Math.pow(10,num);
        return Math.floor((W / dblh) * pow) / pow;
    };
    var bmi = bmiDigit(2);
    console.log(bmi);

    //取得時間,月份取2位數
    var time = new Date();
    var timeMonth = String(time.getMonth()+1);
    while (timeMonth.length < 2){
        timeMonth = '0' + timeMonth;
    }
    var timeDate = time.getDate();
    var timeYear = time.getFullYear();
    var timeTxt =  timeMonth + '-' + timeDate + '-' + timeYear;

    //按鈕變化
    btnOrign.classList.add('close');
    btnOrign2.classList.remove('close');

    if( bmi<=24 && bmi>18){
        //理想
        num = '1';
        txt = '理想';
    }else if( bmi<=17 && bmi>0 ){
        //過輕
        num = '2';
        txt = '過輕';
    }
    else if( bmi<=27 && bmi>24 ){
        //過重
        num = '3';
        txt = '過重';
    }
    else if( bmi<=30 && bmi>27 ){
        //輕度肥胖
        num = '4';
        txt = '輕度肥胖';
    }
    else if( bmi<=35 && bmi>30 ){
        //中度肥胖
        num = '5';
        txt = '中度肥胖';
    }else if( bmi>35 ){
        //重度肥胖
        num = '6';
        txt = '重度肥胖';
    }else {
        alert('資料輸入錯誤');
    };

    //改變圓圈資訊
    str = "";
    str+=
        '<div class="result txt-bmiColor-'+num+' border-Color-'+num+'">\
<span>'+bmi+'</span><small>BMI</small><div class="icon"><img src="images/icons_loop.png"></div>\
</div>\
<h3 class="txt-bmiColor-'+num+' resultText">'+txt+'</h3>'
    btnOrign2.innerHTML = str;

    //組一個陣列 並存入localStorage
    var newArry = {
        content : txt,
        BMI : bmi,
        height: H,
        weight: W,
        class : num,
        day : timeTxt
    };

    date.push(newArry);
    UPdate(date);
    localStorage.setItem('listdata',JSON.stringify(date));
};