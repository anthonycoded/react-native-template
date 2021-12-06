import axios from "axios";
import {
  USER_LOGIN_ATTEMPT,
  USER_LOGIN_SUCCESS1,
  USER_LOGIN_FAIL,
  CLEAR_LOGIN_STATE,
} from "../authConstants";

import AsyncStorage from "@react-native-async-storage/async-storage";
const CHECK_USERNAME_SUCCESS = "CHECK_USERNAME_SUCCESS";
const CHECK_ANSWER_SUCCESS = "CHECK_ANSWER_SUCCESS";

axios.defaults.withCredentials = true;

/////////////////////////////////LOGIN ACTIONs///////////////////////////////////////////////
export const userLoginMain = (user) => async (dispatch) => {
  const { userId, password } = user;

  try {
    const requestData = {
      channel: "mTeller",
      username: "Demos1234",
      password: "Demos1234",
    };

    let response = await axios.post(
      "https://testenv.w-w-i-s.com/iTeller21/api/user/login?entity=AHHRV",
      requestData,
      {
        headers: { "Content-type": "application/json; charset=utf-8" },
        withCredentials: true,
      }
    );

    if (response.status == 200) {
      //Login success = add response msg to state then navigate to homestack
      dispatch({ type: USER_LOGIN_SUCCESS1, payload: true });
      await AsyncStorage.setItem("cookie", response.headers["set-cookie"][0]);
    }
  } catch (error) {
    //Too many login attempts, account is blocked
    if (error.response.data.errorCode == 102) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: {
          error:
            "Too many incorrect login attempts, your account has been restricted. Please contact us to unlock your account",
          status: 102,
        },
      });
    }

    //Password incorrect
    else if (error.response.status == 401) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: {
          error: "Username or Password incorrect. Please try again",
          status: 401,
        },
      });
    }
    //Username incorrect, does not match records
    else if (error.response.status == 404) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: {
          error:
            "Username did not match any account. If you do not have an account please create a new one ",
          status: 404,
        },
      });
    } else {
      //All other failed codes
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  }
};
///////////////////////////////////FORGOT PASSWORD ///////////////////////////////////////////////////////////////
export const checkUsername = (payload) => async (dispatch) => {
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  try {
    //Send request to API
    // let response = await axios.post("backend/api/route", payload, {
    //   headers: { "Content-type": "application/json; charset=utf-8" },
    // });
    dispatch({ type: CHECK_USERNAME_SUCCESS, payload: true });

    // if (response.status == 200) {
    //   dispatch({ type: "Call success Reducer" });
    // } else if (response.status == 401) {
    //   dispatch({ type: "Call failed reducer" });
    // } else {
    //   dispatch({ type: "Call failed reducer" });
    // }
  } catch (error) {
    console.log(error);
  }
};
export const checkAnswer = (payload) => async (dispatch) => {
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  try {
    //Send request to API
    // let response = await axios.post("backend/api/route", payload, {
    //   headers: { "Content-type": "application/json; charset=utf-8" },
    // });
    dispatch({ type: CHECK_ANSWER_SUCCESS, payload: true });

    // if (response.status == 200) {
    //   dispatch({ type: "Call success Reducer" });
    // } else if (response.status == 401) {
    //   dispatch({ type: "Call failed reducer" });
    // } else {
    //   dispatch({ type: "Call failed reducer" });
    // }
  } catch (error) {
    console.log(error);
  }
};

export const forgotPassword = (payload) => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_LOGIN_STATE });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
//////////////////////////////////////////////////////////////////////////////////////////////////
export const clearState = () => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_LOGIN_STATE });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
