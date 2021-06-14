// the script contains functions that manage access token for API calls

function setToken(value) {
  sessionStorage.setItem("SokashAdminaccessToken", value);
}

function getToken() {
  return sessionStorage.getItem("SokashAdminaccessToken");
}

function checkIfTokenExist() {
  //if (sessionStorage.getItem("SokashAdminaccessToken") === null) {
    if(localStorage.hasOwnProperty("SokashAdminaccessToken")){
    return true;
  }
  
  return false;
}

function clearToken() {
  sessionStorage.clear();
}

function setUserDetails(user) {
  sessionStorage.setItem("SokashAdminuser", JSON.stringify(user));
}

function getUserDetails() {
  return JSON.parse(sessionStorage.getItem("SokashAdminuser"));
}

function setAdminAnalysis(analysis) {
  sessionStorage.setItem("sofkashanalysis", JSON.stringify(analysis));
}

function getAdminAnaysis() {
  return JSON.parse(sessionStorage.getItem("sofkashanalysis"));
}

function setEmployeeNo(employeeno) {
  sessionStorage.setItem("soffkashemployee", employeeno);
}

function getEmployeeNo() {
  return sessionStorage.getItem("soffkashemployee");
}
function setLoansNo(employeeno) {
    sessionStorage.setItem("soffkashloanno", employeeno);
  }
  
  function getLoansNo() {
    return sessionStorage.getItem("soffkashloanno");
  }
function setUsersNo(users) {
    sessionStorage.setItem("soffkashuserno", users);
}
function getUsersNo() {
    return sessionStorage.getItem("soffkashuserno");
}
export {
  setToken,
  getToken,
  clearToken,
  checkIfTokenExist,
  setUserDetails,
  getUserDetails,
  setAdminAnalysis,
  getAdminAnaysis,
  setEmployeeNo,
  getEmployeeNo,
  getLoansNo,
  setLoansNo,
  getUsersNo,
  setUsersNo,
}; 
