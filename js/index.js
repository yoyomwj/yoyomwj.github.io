//////////////////////////   ��ȡԪ��  /////////////////////////
var audio = getEle("audio")[0];
var homePageMaskLayer = getEle("#homePageMaskLayer");
var timeOut = getEle("#timeOut");
var timeOutLis = getEle("li",timeOut);
var song = getEle("#song");
var navLis = getEle("li",getEle("#nav"));
var lifeN = getEle("span",getEle("#live"));
var workN = getEle("span",getEle("#work"));
var studyN = getEle("span",getEle("#study"));
var wrap = getEle("#wrap");
var newMemo = getEle("#content");
var oTime = getEle(".time")[0];
var newMemoTime = getEle("span",oTime)[1];
var contentOptions = getEle("#contentOptions");
var homePage = getEle("#homePage");
var prev = getEle("#prev");
var save = getEle("#save");
var content = getEle(".content")[0].getElementsByTagName("div")[0];
var classify = getEle("#classify");
var choice = getEle("#choice");
var maskLayer = getEle("#maskLayer");
var choiceLis = getEle("li",choice);
var OK = getEle(".OK");
var classSpans = getEle("span",classify)[1];
var cancel = getEle(".cancel");
var aColor = getEle("span",getEle("#color"));
var music = getEle(".music");
var musicClassify = getEle("#music");
var musClifyLis = getEle("li",musicClassify);
var musicSpans = getEle("span",music[0])[1];
var repeat = getEle(".repeat");
var repeatMode = getEle("#repeat");
var repModeLis = getEle("li",repeatMode);
var repeatSpans = getEle("span",repeat[0])[1];
var reminderTime = getEle("#time");
var oYear = getEle(".year")[0];
var oMonth = getEle(".month")[0];
var oDay = getEle(".day")[0];
var oHour = getEle(".hour")[0];
var oMin = getEle(".min")[0];
var allTimes = getEle("ul",reminderTime);
var yearLis = getEle("li",allTimes[0]);
var monthLis = getEle("li",allTimes[1]);
var dayLis = getEle("li",allTimes[2]);
var hourLis = getEle("li",allTimes[3]);
var minLis = getEle("li",allTimes[4]);
var arrDate = [];
var arrTimeLis = [yearLis,monthLis,dayLis,hourLis,minLis];
var arrNum = ["20","12",monthDays(),"24","60"];
var arrTime = ["��","��","��","ʱ","��"];
var memo = [];
var arrLife = [];
var arrWork = [];
var arrStudy = [];

/////////////////////////   �¼���  ////////////////////////////
////��ֹPC�¼�
homePage.addEventListener("touchstart",function(ev){
    ev.preventDefault();
});

//����ͨ��localStorage��ȡ������
local();

//��ҳ���ʱ������Ⱦ�¼�
if(memo != null){
    for(var i=0;i<memo.length;i++){
        staRender(memo[i],navLis[0],arrLife);
        staRender(memo[i],navLis[1],arrWork);
        staRender(memo[i],navLis[2],arrStudy);
    }
    //��ʱ����Ƿ����¼���ʱ��
    setInterval(function(){
        showTime(memo);
    },1000);
}

//����ʱ��ѡ��ҳ����
for(var i=0;i<arrTimeLis.length;i++){
    createTime(allTimes[i],arrNum[i],arrTime[i]);
}

//�½�����
newMemo.addEventListener("touchend",newM);

//����
prev.addEventListener("touchend",goBack);

//��ʾ����
classify.addEventListener("touchend",function(){
    show(choice,"block",this);
});

//����ѡ��
for(var i=1;i<choiceLis.length-1;i++){
    choiceLis[i].addEventListener("touchend",function(){
        select(choiceLis,this,1);
    });
}
//�����ȷ����ȡ��
OK[0].addEventListener("touchend",function(){
    ok(choiceLis,choice,classSpans,1);
});
cancel[0].addEventListener("touchend",function(){
    oCancel(choice,classify,choiceLis,1);
});

//����ɫѡ��
for(var i=0;i<aColor.length;i++){
    aColor[i].addEventListener("touchend",color);
}

//��ʾ����
music[0].addEventListener("touchend",function(){
    show(musicClassify,"block",this);
});
//����ѡ��
for(var i=0;i<musClifyLis.length-1;i++){
    musClifyLis[i].addEventListener("touchend",function(){
        select(musClifyLis,this,0);
    });
}
//������ȷ����ȡ��
OK[1].addEventListener("touchend",function(){
    ok(musClifyLis,musicClassify,musicSpans);
});
cancel[1].addEventListener("touchend",function(){
    oCancel(musicClassify,music[0],musClifyLis,0);
});

//�ظ���ʽ
repeat[0].addEventListener("touchend",function(){
    show(repeatMode,"block",this);
});
//�ظ���ʽѡ��
for(var i=0;i<repModeLis.length-1;i++){
    repModeLis[i].addEventListener("touchend",function(){
        select(repModeLis,this,0);
    })
}
//�ظ���ʽ��ȷ����ȡ��
OK[2].addEventListener("touchend",function(){
    ok(repModeLis,repeatMode,repeatSpans);
});
cancel[2].addEventListener("touchend",function(){
    oCancel(repeatMode,repeat[0],repModeLis,0);
});

//��������ʱ��
oTime.addEventListener("touchend",function(){
    show(reminderTime,"block",this);
    var str = newMemoTime.innerHTML.split(" ").join("-").split(":").join("-").split("-");
    arrDate = str;
    for(var i=0;i<arrTimeLis.length;i++){
        //��ǰʱ��
        nowTime(arrTimeLis[i],allTimes[i],arrDate[i]);
        //����ѡȡ����ʱ��
        setReminderTime(allTimes[i],arrTimeLis[i]);
    }
});
//����ʱ��ҳ��ȷ����ȡ��
OK[3].addEventListener("touchend",function(){
    show(reminderTime,"none");
    newMemoTime.innerHTML = arrDate[0]+"-"+arrDate[1]+"-"+arrDate[2]+" "+arrDate[3]+":"+arrDate[4];
});
cancel[3].addEventListener("touchend",function(){
    show(reminderTime,"none");
});

//�������¼�
save.addEventListener("touchend",function(){
    saveMemo();
    setInterval(function(){
        //������������
        showTime(memo);
    },1000);
});


//����ر��¼�
timeOutLis[1].addEventListener("touchend",function(){
    song.pause();
    homePageMaskLayer.style.display = "none";
    timeOut.style.display = "none";
});

//��ҳͷ��������¼�
for(var i=0;i<navLis.length;i++){
    navClick(navLis,i);
}



//////////////////////   ������  ////////////////////////
//��ȡԪ�غ���
function getEle(string,obj){
    obj = obj||document;
    var fist = string.charAt(0);
    var last = string.slice(1);
    if(fist == "#"){
        return obj.getElementById(last);
    }else if(fist == "."){
        return obj.getElementsByClassName(last);
    }else{
        return obj.getElementsByTagName(string);
    }
}

//ͨ��localStorage��ȡ����
function local(){
    if(JSON.parse(localStorage.getItem("memo"))){
        memo = JSON.parse(localStorage.getItem("memo"));
    }
}
//��ҳ���ʱ������Ⱦ����
function staRender(obj,obj2,arr){
    if(obj.classify == obj2.firstElementChild.innerHTML){
        arr.push(obj);
        obj2.lastElementChild.innerHTML = arr.length;
        if(obj2 == navLis[0]){
            createMemo(arrLife);
        }
    }
}
//�½�����
function newM(){
    contentOptions.style.display = "block";
    document.body.style.transition = ".5s";
    document.body.style.left = "-15rem";
    aColor[aColor.length-1].onOff = true;
    var date = new Date();
    var nowYear = date.getFullYear();
    var nowMonth = date.getMonth()+1;
    var nowDate = date.getDate();
    var nowHour = date.getHours();
    var nowMin = date.getMinutes();
    arrDate = [nowYear,nowMonth,nowDate,nowHour,nowMin];
    for(var i=0;i<arrDate.length;i++){
        if(arrDate[i] < 10){
            arrDate[i] = "0"+arrDate[i];
        }
    }
    newMemoTime.innerHTML = arrDate[0]+"-"+arrDate[1]+"-"+arrDate[2]+" "+arrDate[3]+":"+arrDate[4];
}

//����
function goBack(){
    document.body.style.transition = ".5s";
    document.body.style.left = "0";
    setTimeout(function(){
        contentOptions.style.display = "none";
    },500);
}
//ѡ��ҳ��ʾ
function show(obj,state,obj2){
    obj2 = obj2||"";
    maskLayer.style.display = state;
    obj.style.display = state;
    if(obj2){
        var str = obj2.firstElementChild.nextElementSibling.innerHTML;
        return str;
    }
}
//ѡ��ҳ����ѡ����
function select(obj,obj2,n){
    clear(obj,n);
    obj2.lastElementChild.className = "select";
    obj2.onOff = true;
}
//����ϴ
function clear(obj,n){
    n = n||0;
    for(var i=n;i<obj.length-1;i++){
        obj[i].lastElementChild.className = "";
        obj[i].onOff = false;
    }
}
//��ɫѡ����
function color(){
    for(var i=0;i<aColor.length;i++){
        aColor[i].className = "";
        aColor[i].onOff = false;
    }
    this.className = "active";
    this.onOff = true;
}

//ѡ��ҳȷ������
function ok(obj,obj2,obj3,n){
    n = n||0;
    for(var i=n;i<obj.length-1;i++){
        show(obj2,"none");
        if(obj[i].onOff){
            obj3.innerHTML = obj[i].firstElementChild.innerHTML;
        }
    }
}
//ѡ��ҳȡ������
function oCancel(obj1,obj2,obj,n){
    var str = show(obj1,"none",obj2);
    for(var i=n;i<obj.length-1;i++){
        var con = obj[i].firstElementChild.innerHTML;
        if(con == str){
            clear(obj,n);
            obj[i].lastElementChild.className = "select";
            obj[i].onOff = true;
        }
    }
}
//��ȡ��������������
function monthDays(){
    var date = new Date();
    date.setMonth(date.getMonth()+1);
    date.setDate(0);
    var allDays = "";
    return allDays = date.getDate();
}
//�������ڼ�ʱ�亯��
function createTime(obj,n,string){
    var str = "";
    if(obj == allTimes[0]){
        for(var i=0;i<n;i++){
            str += "<li>"+(2017+i)+string+"</li>"
        }
    }else if(obj == allTimes[1] || obj == allTimes[2]){
        for(var i=0;i<n*2;i++){
            var j = i%n+1<10?"0"+(i%n+1):i%n+1;
            str += "<li>"+j+string+"</li>"
        }
    }else if(obj == allTimes[3] || obj == allTimes[4]){
        for(var i=0;i<n*2;i++){
            var j = "";
            if(i == n-1 || i == n*2-1){
                j = (i+1)%n+"0";
            }else{
                j = i%n+1<10?"0"+(i%n+1):i%n+1;
            }
            str += "<li>"+j+string+"</li>"
        }
    }
    obj.innerHTML += str;
}
//��ǰʱ��
function nowTime(obj,obj2,times){
    for(var i=0;i<obj.length/2;i++){
        nowTime1(obj,i,times,obj2)
    }
}
function nowTime1(obj,n,nowTime,obj2){
    var times = parseFloat(obj[n].innerHTML);
    if(times == nowTime){
        timeClear(obj);
        if(obj2 != allTimes[0]){
            if(n < obj.length/4){
                n = obj.length/2 + n;
            }
        }
        obj[n].style.fontWeight = "bold";
        obj[n].style.color = "lightskyblue";
        obj2.style.top = -(n-1)*54 + "px";
    }
}
//������������ʱ��
function setReminderTime(obj,obj3){
    var startY ;
    var startT;
    var H = 54;
    obj.addEventListener("touchstart",function(ev){
        touchStart(ev,obj);
    });
    obj.addEventListener("touchmove",function(ev){
        touchMove(ev,obj);
    });
    obj.addEventListener("touchend",function(){
        obj.style.transition = ".2s";
        obj.style.top = Math.round(obj.offsetTop/H)*H + "px";
    });
    function touchStart(ev){
        var touch = ev.changedTouches[0];
        startY = touch.pageY;
        startT = obj.offsetTop;
        obj.style.transition = "";
    }
    function touchMove(ev){
        ev.preventDefault();
        var touch = ev.changedTouches[0];
        timeClear(obj3);
        var disY = touch.pageY;
        var t = disY - startY + startT;
        if(obj == allTimes[0]){
            if (t > 62) {
                t = 62;
            }
            if(t < -(obj3.length-2)*H){
                t = -(obj3.length-2)*H;
            }
        }else{
            if(t > -1){
                t = t -(obj3.length-1)*H/2;
            }

            if(t < -(obj3.length-3)*H){
                t =  - (obj3.length-6)*H/2 - ((obj3.length-3)*H+t);
            }
        }
        obj.style.top = t + "px";
        var n = Math.abs(Math.round(obj.offsetTop/H)-1);
        obj3[n].style.color = "lightskyblue";
        obj3[n].style.fontWeight = "bold";

        var str = obj3[n].innerHTML;
        var last = str.charAt(str.length-1);
        switch(last){
            case "��":
                arrDate[0] =str.slice(0,str.length-1);
                break;
            case "��":
                arrDate[1] =str.slice(0,str.length-1);
                break;
            case "��":
                arrDate[2] =str.slice(0,str.length-1);
                break;
            case "ʱ":
                arrDate[3] =str.slice(0,str.length-1);
                break;
            case "��":
                arrDate[4] =str.slice(0,str.length-1);
        }
    }
}
//ʱ����ʽ����ϴ
function timeClear(obj){
    for(var i=0;i<obj.length;i++){
        obj[i].style.color = "#999";
        obj[i].style.fontWeight = "normal";
    }
}
//��������¼�
function saveMemo(){
    if(content.innerHTML == ""){
        alert("�����뱸�����ݣ�");
        return;
    }
    for(var i=0;i<aColor.length;i++){
        if(aColor[i].onOff){
            var c = aColor[i].style.color;
        }
    }
    var memoContent = {
        content:content.innerHTML,
        classify:classSpans.innerHTML,
        backgroundColor:c,
        music:musicSpans.innerHTML,
        repeat:repeatSpans.innerHTML,
        ReminderTime:arrDate
    };
    memo.unshift(memoContent);
    localStorage.setItem("memo",JSON.stringify(memo));
    local();
    content.innerHTML = "";
    goBack();
    getChild(memoContent.classify,memo);
}
//��ȡ�Ӽ�
function getChild(obj,obj2){
    var arr = ["arrLife","arrWork","arrStudy"];
    for(var i=0;i<navLis.length;i++){
        navLis[i].className = "";
        navLis[i].onOff = false;
        var str = navLis[i].firstElementChild.innerHTML;
        if(str == obj){
            navLis[i].className = "active";
            navLis[i].onOff = true;
        }
        getByClassify(obj2,str);
        if(navLis[i].onOff){
            renderDate(arr[i],"arrLife",arrLife);
            renderDate(arr[i],"arrWork",arrWork);
            renderDate(arr[i],"arrStudy",arrStudy);
        }
    }
}
//��ȡ���Ӽ���length
function getByClassify(obj,string){
    arrLife = [];
    arrWork = [];
    arrStudy = [];
    for(var i=0;i<obj.length;i++){
        if(obj[i].classify == lifeN[0].innerHTML){
            arrLife.push(obj[i]);
        }
        if(obj[i].classify == workN[0].innerHTML){
            arrWork.push(obj[i]);
        }
        if(obj[i].classify == studyN[0].innerHTML){
            arrStudy.push(obj[i]);
        }
    }
    classNmu(arrLife,lifeN[1]);
    classNmu(arrWork,workN[1]);
    classNmu(arrStudy,studyN[1]);
}
//ͳ�Ƹ������¼��Ŀ
function classNmu(obj,obj2){
    if(obj.length != 0){
        obj2.innerHTML = obj.length;
    }
}
//��ҳͷ��������¼�����
function navClick(obj,n){
    var arr = ["arrLife","arrWork","arrStudy"];
    obj[n].addEventListener("touchend",function(){
        for(var i=0;i<navLis.length;i++){
            navLis[i].className = "";
        }
        renderDate(arr[n],"arrLife",arrLife);
        renderDate(arr[n],"arrWork",arrWork);
        renderDate(arr[n],"arrStudy",arrStudy);
        navLis[n].className = "active";
        navLis[n].onOff = true;
    })
}
//������Ⱦ
function renderDate(string1,string,arr){
    if(string1 == string){
        createMemo(arr);
    }
}
//����ҳ����ʾ����
function createMemo(obj){
    wrap.innerHTML = "";
    for(var i=0;i<obj.length;i++){
        var div = document.createElement("div");
        div.innerHTML = obj[i].content;
        var div1 = document.createElement("div");
        div1.innerHTML = "���ѣ�"+obj[i].ReminderTime[1]+"-"+obj[i].ReminderTime[2]+" "+obj[i].ReminderTime[3]+":"+obj[i].ReminderTime[4];
        var li = document.createElement("li");
        li.style.backgroundColor = obj[i].backgroundColor;
        li.appendChild(div);
        li.appendChild(div1);
        li.appendChild(audio);
        var ul = document.createElement("ul");
        ul.appendChild(li);
        wrap.appendChild(ul);
    }
}
//�������Ѻ���
function showTime(obj){
    //��ȡ��ǰʱ��
    var date = new Date();
    var year = date.getFullYear();
    var mon = date.getMonth()+1;
    var day = date.getDate();
    var hou = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    //��ǰʱ��������ʱ��һ��ʱ������
    remind(obj,year,mon,day,hou,min,sec);
}
function remind(obj,yea,mon,day,hou,min,sec){
    for(var i=0;i<obj.length;i++){
        if(obj[i].ReminderTime[0] == yea && obj[i].ReminderTime[1] == mon && obj[i].ReminderTime[2] == day && obj[i].ReminderTime[3] == hou && obj[i].ReminderTime[4] == min && sec == 0){
            homePageMaskLayer.style.display = "block";
            timeOut.style.display = "block";
            timeOutLis[0].innerHTML = obj[i].content;
            song.src =  "music/"+obj[i].music+".mp3";
            if(!song.play()){
                song.play();
            }
            //�����ֻ��𶯴���
            //vibration();
            //function vibration(){
            //    navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
            //    shock = setInterval(function(){
            //        navigator.vibrate(1500);
            //    },2000);
            //}
        }
    }
}

