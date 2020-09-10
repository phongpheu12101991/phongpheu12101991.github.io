import "./views/screens/login.js";
import "./views/screens/register.js";
import "./views/components/form-input.js";
import "./views/components/friend.js";
import "./views/components/room.js";
import "./views/components/charitem.js";
import "./models/auth.js";
import "./views/screens/acc.js";
import "./views/screens/room.js";
import "./views/screens/play.js";

let screenMap = {
  login: "<login-screen></login-screen>",
  register: "<register-screen></register-screen>",
  chat: "<chat-screen></chat-screen>",
  acc: "<acc-screen></acc-screen>",
  shop: "<shop-screen></shop-screen>",
  room: "<room-screen></room-screen>",
  play: "<play-screen></play-screen>",
};

function setScreen(screenname) {
  document.getElementById("app").innerHTML = screenMap[screenname];
}
// set phien ng dung
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

setScreen("login");

export { setScreen };
