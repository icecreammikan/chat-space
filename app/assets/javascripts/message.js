$(function(){
  function buildHTML(message){
      var image = message.image ? `<img src= ${message.image} ></img>`: "";
      var html = 
      `<div class="message", data-message-id=${message.id}>
        <div class="message__upper-info">
        ${message.user_name}
          <div class="message__upper-date">
          ${message.created_at}
          </div>
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
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      dataType: 'json',
      data: formData,
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
      .fail(function() {
        alert('メッセージ送信に失敗しました');
      })


    })

    
      var reloadMessages = function() {
        var last_message_id = $(".message:last").data("message-id");
        $.ajax({
          url: 'api/messages',
          type: 'GET',
          dataType: 'json',
          data: {id: last_message_id},
        })
        .done(function(messages) {
          if('messages'.length > 0 ){
          var insertHTML = '';
          messages.forEach(function (message){
            insertHTML = buildHTML(message)
            $('.messages').append(insertHTML)
          })
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          }
        })
        .fail(function() {
          alert('自動更新に失敗しました');
        });
      };
    if(location.href.match(/\/groups\/\d+\/messages/)){
    setInterval(reloadMessages, 7000);}
});
