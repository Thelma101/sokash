// the script contains functions that manage access token for API calls

function setToken(value) {
  sessionStorage.setItem("BB360accessToken", value);
}

function getToken() {
  return sessionStorage.getItem("BB360accessToken");
}

function checkIfTokenExist() {
  if (sessionStorage.getItem("BB360accessToken") === null) {
    return false;
  }
  return true;
}

function clearToken() {
  sessionStorage.clear();
}

function setUserDetails(user) {
  sessionStorage.setItem("bb360user", JSON.stringify(user));
}

function getUserDetails() {
  return JSON.parse(sessionStorage.getItem("bb360user"));
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
