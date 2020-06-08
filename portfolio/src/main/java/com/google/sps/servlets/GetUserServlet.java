package com.google.sps.servlets;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

/* Servlet that adds a comment to the dataserve. */
@WebServlet("/user")
public class GetUserServlet extends HttpServlet {
  
  /* Validates that the user is logged in and get their email */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    UserService userService = UserServiceFactory.getUserService();
    response.setContentType("application/json;");

    if (userService.isUserLoggedIn()) {
      String email = userService.getCurrentUser().getEmail();
      response.getWriter().println("{user: " + email + "}");
    } else {
      response.getWriter().println("{error: 'User not logged in' }");
    }
  }
}
