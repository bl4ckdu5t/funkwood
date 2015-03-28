var ready = function () {
 
    /**
     * When the send message link on our home page is clicked
     * send an ajax request to our rails app with the sender_id and
     * recipient_id
     */
    if(window.location.hostname === 'localhost'){
        var baseurl = window.location.protocol + '//localhost:3000/';
    }else{
        var baseurl = window.location.protocol + '//' + window.location.hostname + '/';
    } 
    $(document).on('click','.start-conversation',function (e) {
        e.preventDefault();
 
        var sender_id = $(this).data('sid');
        var recipient_id = $(this).data('rip');
        $.post(baseurl+'conversations', { sender_id: sender_id, recipient_id: recipient_id }, function (data) {
            chatBox.chatWith(data.conversation_id);
        });
    });
 
    /**
     * Used to minimize the chatbox
     */
 
    $(document).on('click', '.toggleChatBox', function (e) {
        e.preventDefault();
 
        var id = $(this).data('cid');
        chatBox.toggleChatBoxGrowth(id);
    });
 
    /**
     * Used to close the chatbox
     */
 
    $(document).on('click', '.closeChat', function (e) {
        e.preventDefault();
 
        var id = $(this).data('cid');
        chatBox.close(id);
    });
 
 
    /**
     * Listen on keypress' in our chat textarea and call the
     * chatInputKey in chat.js for inspection
     */
 
    $(document).on('keydown', '.chatboxtextarea', function (event) {
 
        var id = $(this).data('cid');
        chatBox.checkInputKey(event, $(this), id);
    });
 
    /**
     * When a conversation link is clicked show up the respective
     * conversation chatbox
     */
 
    $(document).on('click','.conversation',function (e) {
        e.preventDefault();
 
        var conversation_id = $(this).data('cid');
        chatBox.chatWith(conversation_id);
    });
 
 
}
 
$(document).ready(ready);
