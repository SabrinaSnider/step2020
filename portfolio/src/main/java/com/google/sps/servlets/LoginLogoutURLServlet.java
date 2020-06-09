package com.google.sps.servlets;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.gson.JsonObject;

@WebServlet("/login-logout-url")
public class LoginLogoutURLServlet extends HttpServlet {
  
  /* Returns a login or logout link depending on whether the user is logged in */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    UserService userService = UserServiceFactory.getUserService();
    JsonObject json = new JsonObject();

    if (userService.isUserLoggedIn()) {
      String logoutURL = userService.createLogoutURL("/");
      json.addProperty("logout", logoutURL);
    } else {
      String loginURL = userService.createLoginURL("/");
      json.addProperty("login", loginURL);
    }
    response.setContentType("application/json;");
    response.getWriter().println(json);
  }
}
