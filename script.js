$(function() {
  // ボタンアニメーション
  $('.button-more').on('mouseover', function() {
    $(this).animate({
      opacity: 0.5,
      marginLeft: 20,
    }, 100);
  });
  $('.button-more').on('mouseout', function() {
    $(this).animate({
      opacity: 1.0,
      marginLeft: 0,
    }, 100);
  });

  // カルーセル
  $('.carousel').slick({
    autoplay: true,
    dots: true,
    infinite: true,
    autoplaySpeed: 5000,
    arrows: false,
  });

  //AjaxでStatic Formsにデータを送信
  $('#submit').on('click', function (event) {
    // formタグによる送信を拒否
    event.preventDefault();
    // 入力チェックをした結果、エラーがあるかないか判定
    let result = inputCheck(); 

    // エラー判定とメッセージを取得
    let error = result.error;
    let message = result.message;

    if (error == false) {
      //AjaxでStatic Formsにデータを送信
      $.ajax({
        url: 'https://api.staticforms.xyz/submit',
        type: 'POST',
        dataType: 'json',
        data: $('#form').serialize(),
        success: function (result) {
          alert('お問い合わせを送信しました')
        },
        error: function (xhr, resp, text) {
          alert('お問い合わせを送信出来ませんでした')
        }
      });
    } else {
      // エラーメッセージを表示
      alert(message);
    };

  });

  // フォーカスが外れた時、(blur)にフォームの入力チェックをする
  $('#name').blur(function() {
    inputCheck();
  });
  $('#furigana').blur(function() {
    inputCheck();
  });
  $('#email').blur(function() {
    inputCheck();
  });
  $('#tel').blur(function() {
    inputCheck();
  });
  $('#message').blur(function() {
    inputCheck();
  });
  $('#agree').click(function() {
    inputCheck();
  });


  //お問い合わせフォームの入力チェック
  function inputCheck() {
    // エラーのチェック結果
    let result;
    // エラーメッセージ
    let massage = '';
    // エラーがなければfalse、エラーがあればtrue
    let error = false;

    // お名前のチェック
    if ($('#name').val() == '') {
      // エラー（空白）
      $('#name').css('background-color','#f79999');
      error = true;
      message += 'お名前を入力して下さい。\n';
    } else {
      // エラーなし
      $('#name').css('background-color','#fafafa');
    };

    // フリガナのチェック
    if ($('#furigana').val() == '') {
      // エラー（空白）
      $('#furigana').css('background-color','#f79999');
      error = true;
      message += 'フリガナを入力して下さい。\n';
    } else {
      // エラーなし
      $('#furigana').css('background-color','#fafafa');
    };

    // お問い合わせのチェック
    if ($('#message').val() == '') {
      // エラー（空白）
      $('#message').css('background-color','#f79999');
      error = true;
      message += 'お問い合わせン内容を入力して下さい。\n';
    } else {
      // エラーなし
      $('#message').css('background-color','#fafafa');
    };

    // メールアドレスのチェック
    if ($('#email').val() == '' || $('#email').val().indexOf('@') == -1 || $('#email').val().indexOf('.') == -1) {
      // エラー
      $('#email').css('background-color','#f79999');
      error = true;
      message += 'メールアドレスが未入力、または[@][.]が含まれていません。 \n';
    } else {
      // エラーなし
      $('#email').css('background-color','#fafafa');
    };    

    // 電話番号のチェック
    if ($('#tel').val() != '' && $('#tel').val().indexOf('-') == -1) {
      // エラー
      $('#tel').css('background-color','#f79999');
      error = true;
      message += '電話番号に[-]が含まれていません。 \n';
    } else {
      // エラーなし
      $('#tel').css('background-color','#fafafa');
    }; 
    
    // 個人情報のチェックボックスのチェック
    if ($('#agree').prop('checked') == false) {
      error = true;
      message += '個人情報の取り扱いについてご確認の上、チェックをして下さい。 \n';
    };

    // エラーの有無で送信ボタンを切替
    if(error == true) {
      $('#submit').attr('src', 'images/button-submit.png');
    } else {
      $('#submit').attr('src', 'images/button-submit-blue.png');
    };

    // オブジェクトでエラー判定とメッセージを返す
    result = {
      error: error,
      message: message
    };

    return result;
  };

});