package com.google.sps.servlets;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.gson.JsonObject;

@WebServlet("/is-admin")
public class IsAdminServlet extends HttpServlet {
  
  /* Check whether or not the user had admin permissions */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    UserService userService = UserServiceFactory.getUserService();
    JsonObject json = new JsonObject();

    if (userService.isUserAdmin()) {
      json.addProperty("admin", "true");
    } else {
      json.addProperty("admin", "true");
    }
    response.setContentType("application/json;");
    response.getWriter().println(json);
  }
}
