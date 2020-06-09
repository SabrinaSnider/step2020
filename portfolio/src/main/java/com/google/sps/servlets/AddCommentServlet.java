package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

/* Servlet that adds a comment to the dataserve. */
@WebServlet("/add-comment")
public class AddCommentServlet extends HttpServlet {

  /* Adds the request comment to the datastore */
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    UserService userService = UserServiceFactory.getUserService();
    if (!userService.isUserLoggedIn()) return;

    String email = userService.getCurrentUser().getEmail();
    String message = request.getParameter("message");
    long timestamp = System.currentTimeMillis();

    Entity newComment = new Entity("Comment");

    newComment.setProperty("email", email);
    newComment.setProperty("timestamp", timestamp);
    newComment.setProperty("message", message);

    DatastoreServiceFactory.getDatastoreService().put(newComment);
  }
}
