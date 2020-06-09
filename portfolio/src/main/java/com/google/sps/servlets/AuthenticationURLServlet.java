package com.google.sps.servlets;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

/* Servlet that adds a comment to the dataserve. */
@WebServlet("/auth-url")
public class AuthenticationURLServlet extends HttpServlet {
  
  /* Validates that the user is logged in and get their email */
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
