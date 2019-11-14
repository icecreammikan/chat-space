$(function(){
  function buildHTML(message){
    if(message){
      var html = 
        `<div class="message">
          <div class="message__upper-info">
          ${message.user}
          </div>
          <div class="message__text">
            <p class="lower-message__text">
            ${message.text}
            </p>
          </div>
        </div>`
      return html; 
    }else{
      var html = 
      `<div class="message">
        <div class="message__upper-info">
        ${message.user}
        </div>
        <div class="message__text">
          <p class="lower-message__text">
          ${message.text}
          </p>
          <img src= ${message.image} >
        </div>
      </div>`
      return html;
      }
    }
  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this)
      console.log(formData)
    var url = $(this).attr('action');
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: 'POST',  //同期通信でいう『HTTPメソッド』
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#message_text').val('');
      $('.input-box__image').val('');
      // $('#new_message').reset('');
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
      $('form_send').prop('disabled', true);
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    });
  });
})
