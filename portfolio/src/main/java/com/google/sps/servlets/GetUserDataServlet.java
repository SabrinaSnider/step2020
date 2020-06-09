package com.google.sps.servlets;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;
import com.google.gson.JsonObject;

@WebServlet("/user-data")
public class GetUserDataServlet extends HttpServlet {
  
  /* Validates that the user is logged in and gets their email */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    UserService userService = UserServiceFactory.getUserService();
    JsonObject json = new JsonObject();

    if (userService.isUserLoggedIn()) {
      String email = userService.getCurrentUser().getEmail();
      json.addProperty("email", email);

      json.addProperty("admin", userService.isUserAdmin() ? "true" : "false");
    } else {
      json.addProperty("error", "User not logged in");
      json.addProperty("admin", "false");
    }

    response.setContentType("application/json;");
    response.getWriter().println(json);
  }
}
