import React from 'react'
import s from './Dialogs.module.css'
import Message from './Message/Message'
import DialogItem from './DialogItem/DialogItem'


const Dialogs = (props) => {

  let dialogElements = props.dialogsData.map((it) => (
    <DialogItem name={it.name} id={it.id} />
  ));

  let messageElements = props.messagesData.map((it) => (
    <Message message={it.message} />
  ));

  let newMessageElement = React.createRef();

  let sendMessageUI = () => {
    props.sendMessage();
    //props.dispatch(sendMessageActionCreator())
  }

  let newMessageUI = (e) => {
    let newMessage = e.target.value;
    props.newMessage(newMessage);
    //props.dispatch(updateMessageTextActionCreator(newMessage));
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogItems}>{dialogElements}</div>
      <div className={s.messages}>
        {messageElements}
        <div>
          <textarea
            placeholder="Type a message..."
            onChange={newMessageUI}
            ref={newMessageElement}
            value={props.newMessageText}
          ></textarea>
        </div>
        {/* <div>
          <input id="antoxa" placeholder="Номер сохраняется в БД"></input>
          <importScripts>
            <script>
              window.addEventListener("DOMContentLoaded", function() {
                [].forEach.call(
                document.querySelectorAll("#antoxa"),
                function (input) {
                  var keyCode;
                  function mask(event) {
                    event.keyCode && (keyCode = event.keyCode);
                    var pos = this.selectionStart;
                    if (pos < 3) event.preventDefault();
                    var matrix = "+7 (___) ___ ____",
                      i = 0,
                      def = matrix.replace(/\D/g, ""),
                      val = this.value.replace(/\D/g, ""),
                      new_value = matrix.replace(/[_\d]/g, function (a) {
                        return i < val.length
                          ? val.charAt(i++) || def.charAt(i)
                          : a;
                      });
                    i = new_value.indexOf("_");
                    if (i !== -1) {
                      i < 5 && (i = 3);
                      new_value = new_value.slice(0, i);
                    }
                    var reg = matrix
                      .substr(0, this.value.length)
                      .replace(/_+/g, function (a) {
                        return "\\d{1," + a.length + "}";
                      })
                      .replace(/[+()]/g, "\\$&");
                    reg = new RegExp("^" + reg + "$");
                    if (
                      !reg.test(this.value) ||
                      this.value.length < 5 ||
                      (keyCode > 47 && keyCode < 58)
                    )
                      this.value = new_value;
                    if (event.type === "blur" && this.value.length < 5)
                      this.value = "";
                  }

                  input.addEventListener("textarea", mask, false);
                  input.addEventListener("focus", mask, false);
                  input.addEventListener("blur", mask, false);
                  input.addEventListener("keydown", mask, false);
                }
              )}
              );
            </script>
          </importScripts>
              </div> */}
        <div>
          <button onClick={sendMessageUI}>Отправить</button>
        </div>
      </div>
    </div>
  );
}

export default Dialogs
