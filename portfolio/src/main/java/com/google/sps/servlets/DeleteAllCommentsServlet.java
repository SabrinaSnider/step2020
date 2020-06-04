package com.google.sps.servlets;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/* Servlet that deletes all comments from the dataserve. */
@WebServlet("/delete-all-comments")
public class DeleteAllCommentsServlet extends HttpServlet {

  /* Removes all comments from the datastore */
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery allComments = datastore.prepare(new Query("Comment"));

    for (Entity comment : allComments.asIterable()) {
      datastore.delete(comment.getKey());
    }
  }
}
