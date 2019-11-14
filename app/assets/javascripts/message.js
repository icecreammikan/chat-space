$(function(){
  function buildHTML(message){
      var image = message.image ? `<img src= ${message.image} ></img>`: ""
      var html = 
      `<div class="message">
        <div class="message__upper-info">
        ${message.user}
        </div>
        <div class="message__text">
          <p class="lower-message__text">
          ${message.text}
          </p>
          ${image}
        </div>
      </div>`
      return html;

  }
  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this)
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
      $('#new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');   
      $('#form_send').prop('disabled', false);
    })
    .fail(function(){
      alert('メッセージ送信に失敗しました');
    });
  });
})
