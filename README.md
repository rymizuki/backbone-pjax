backbone-pjax
=============

## sample 

Backbone.js with jquery-pjax
    (function () {
        "use strict";
    
        var MyRouter = Backbone.Pjax.extend({
            "pjax" : {
                "container" : '#container', // $.pjaxのcontainerとなる要素を指定してください
                "options" : {               // $.pjaxのoptionを指定してください
                    "timeout" : 2000
                }
            },
            "initialize" : function () {
                // pjaxイベントの設定
    
                if ($.support.pjax) { // ブラウザがpjaxをサポートしているか
                    this.pjaxInit(); // $.pjaxの初期化処理
                    this.on('pjax:beforeSend', function () { // $.pjaxのbeforeSendのイベントにbindする
                        console.log('pjax before send');
                    },this);
                    this.on('pjax:end', this.pageInit, this); // $.pjaxのendのイベントにbindする
                }
            },
            // 以降はBackbone.Roterと同様に利用かのう
            "routes" : {
                // 
            }
        });
    })();
    
    script
