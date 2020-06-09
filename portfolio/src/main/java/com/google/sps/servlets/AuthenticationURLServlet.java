package com.google.sps.servlets;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

@WebServlet("/auth-url")
public class AuthenticationURLServlet extends HttpServlet {
  
  /* Returns a login or logout link depending on whether the user is logged in */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    UserService userService = UserServiceFactory.getUserService();
    response.setContentType("application/json;");

    if (userService.isUserLoggedIn()) {
      String logoutURL = userService.createLogoutURL("/");
      response.getWriter().println("{\"logout\": \"" + logoutURL + "\"}");
    } else {
      String loginURL = userService.createLoginURL("/");
      response.getWriter().println("{\"login\": \"" + loginURL + "\"}");
    }
  }
}
