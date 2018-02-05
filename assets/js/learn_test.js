var globalObject={
}
globalObject.allQuestions = [
    {
        question: "网页开发中，一般需要判断浏览器类型，需通过userAgent中获取浏览器内核来判断，下列说法错误的是?",
        code:"",
        choices: [
           "一直到IE9,都是Trident内核",
           "firefox是Gecko内核",
           "chrome是webkit内核",
           "IE是目前最快的浏览器",
           "IE是目前最快的浏览器",
           "IE是目前最快的浏览器"],
        correctAnswer: 3,
        alreadySelect:-1
    },{
        question:"当窗口上下滚动时，能始终固定在视野顶端的是（div的直接父级元素是<body>）?",
        code:"",
        choices:[
            '<div style="position:fixed;top:0"></div>',
            '<div style="position:absolute;top:0"></div>',
            '<div style="position:relative;top:0"></div>',
            '<div style="margin-top:0"></div>'
        ],
        correctAnswer:0,
        alreadySelect:-1
    },{
        question:"在HTML页面上包含如下所示的层对象，则javascript语句document.getElementById('info').innerHTML的值是（）?",
        code:"&lt;div id='info' style='display:block'&gt;&nbsp;&nbsp;\n&lt;p&gt;请填写&lt;/p&gt;&nbsp;&nbsp;&lt;/p&gt;\n&lt;/div&gt;&lt;/div&gt;",

        choices:[
            '请填写',
            '<p>请填写</p>',
            'id="info" style="display:block"',
            '<div id="info" style="display:block"><p>请填写</p></div>'
        ],
        correctAnswer:1,
        alreadySelect:-1
    },{
        question:"下列哪一项不是HTML5中新增加的标签?",
        code:"",
        choices:[
            'nav',
            'article',
            'caption',
            'video'
        ],
        correctAnswer:2,
        alreadySelect:-1
    },{
        question:"sessionStorage保存数据的方法正确的是:",
        code:"",
        choices:[
            'sessionStorage.setItem("键值","键名")',
            'sessionStorage.saveItem("键名","键值")',
            'sessionStorage.saveItem("键值","键名")',
            'sessionStorage.setItem("键名","键值")'
        ],
        correctAnswer:3,
        alreadySelect:-1
    },{
        question:"在CSS3中，以下哪个IE浏览器（Trident内核）的私有属性前缀?",
        code:"",
        choices:[
            '-Webkit',
            '-trident',
            '-ie',
            '-ms'
        ],
        correctAnswer:3,
        alreadySelect:-1
    }
];

function afterSelector(target,answers,allQuestions){
    var nowPage=document.querySelector("#nowPage");
    var correctAnswer=allQuestions[nowPage.innerText-1].correctAnswer;
    allQuestions[nowPage.innerText-1].alreadySelect=target.dataset.index;
    if(target.dataset.index==correctAnswer){
        target.classList.add("answer-true");
        for(answer of answers){
            if(answer !== target && answer.dataset.index>=0){
                answer.classList.add("answer-other");
            }
        }
    }else{
        target.classList.add("answer-false"); 
        for(answer of answers){
            if(answer.dataset.index==correctAnswer){
                answer.classList.add("answer-true");
                continue;
            }
            if(answer !== target && answer.dataset.index>=0){
                answer.classList.add("answer-other");
            }
        }
    }
}


function isAlready(questionCount,containerSection,allQuestions){
    var nowQuestion=allQuestions[questionCount];
        if(nowQuestion.alreadySelect>=0){
            var answers=containerSection.children;
            for(answer of answers){
                if(answer.dataset.index==nowQuestion.correctAnswer){
                    answer.classList.add("answer-true");
                    continue;
                }
                if(answer.dataset.index==nowQuestion.alreadySelect){
                    answer.classList.add("answer-false");
                    continue; 
                }
                if(answer.dataset.index>=0){
                    answer.classList.add("answer-other");
                }
            }
        }else{
            containerSection.dataset.isclick="";
        }
}


function addContent(count,containerSection,allQuestions){
    containerSection.innerHTML="";
    var elementFragment=document.createDocumentFragment();
    elementFragment.appendChild(createContent(-1,allQuestions[count].question,"p","question"));
    if(!!allQuestions[count].code){
        elementFragment.appendChild(createContent(-1,allQuestions[count].code,"pre","pre-code")); 
    }
    var choices=allQuestions[count].choices;
    for(var index=0;index<choices.length;index++){
        elementFragment.appendChild(createContent(index,choices[index],"p","answer"));
    }
    containerSection.appendChild(elementFragment);
}


function createContent(index,contentText,elementCha,...cssRules){
    var section=document.createElement("section");
    section.setAttribute("data-index",index);
    for(cssRulesText of cssRules){
        section.classList.add(cssRulesText);
    }
    var p=document.createElement(elementCha);
    section.appendChild(p);
    if(elementCha === 'pre'){
        var code=document.createElement("code");
        p.appendChild(code);
        code.innerHTML=contentText;
    }else{
        p.innerText=contentText;
    }
    return section;
}

window.addEventListener("load",function(){

    var allQuestions = globalObject.allQuestions;
    var questionCount=0;
    var answerElement=document.querySelector(".ar-content");
    addContent(questionCount,answerElement,allQuestions);
    answerElement.addEventListener('click',function(event){
        if(!!event.currentTarget.dataset.isclick){
            event.preventDefault();
        }else{
            var target=event.target;
            var answers=answerElement.children;
            if(target.classList.contains("answer")){
                afterSelector(target,answers,allQuestions);
            }else if(target.parentNode.classList.contains("answer")){
                afterSelector(target.parentNode,answers,allQuestions);
            }
            event.currentTarget.dataset.isclick="true";

        }
    },false);

    var nextQuestion=document.querySelector(".btn-next");
    nextQuestion.addEventListener("click",function(event){
        if(questionCount<allQuestions.length-1 && allQuestions[questionCount].alreadySelect>=0){
            questionCount+=1;
            addContent(questionCount,answerElement,allQuestions);
            isAlready(questionCount,answerElement,allQuestions); 
            document.querySelector("#nowPage").innerText=questionCount+1;
        }
    },false);

    var previousQuestion=document.querySelector(".btn-previous");
    previousQuestion.addEventListener("click",function(event){
        if(questionCount!==0){
            questionCount-=1;
            addContent(questionCount,answerElement,allQuestions);
            isAlready(questionCount,answerElement,allQuestions);
            document.querySelector("#nowPage").innerText=questionCount+1;
        }
    },false);


    var totalPage=document.querySelector("#totalPage");
    totalPage.innerText=allQuestions.length;
    document.querySelector("#nowPage").innerText=questionCount+1;
},false);