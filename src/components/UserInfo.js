export default class UserInfo {
  constructor(configInfo) {
    this._profileName = document.querySelector(configInfo.profileNameSelector);
    this._profileJob = document.querySelector(configInfo.profileJobSelector);
    this._profileAvatar = document.querySelector(
      configInfo.profileAvatarSelector
    );
  }

  getUserInfo() {
    return {
      username: this._profileName.textContent,
      userInfo: this._profileJob.textContent,
    };
  }

  setUserInfo({ username, userInfo, avatar }) {
    this._profileAvatar.src = avatar;
    this._profileName.textContent = username;
    this._profileJob.textContent = userInfo;
  }
}
