// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import structures.Comment;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.gson.Gson;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/comment")
public class DataServlet extends HttpServlet {

  /* Converts the comments arraylist to a json String */
  private String convertToJson(List<Comment> data) {
    return (new Gson()).toJson(data);
  }

  /* Gets the query results from the datastore for Comments */
  private PreparedQuery queryComments(String sortBy, boolean ascending) {
    Query.SortDirection sortDirection = ascending ? SortDirection.ASCENDING : SortDirection.DESCENDING;
    Query queryForComments = new Query("Comment").addSort(sortBy, sortDirection);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    return datastore.prepare(queryForComments);
  }

  /* Returns a json String of the comments */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    PreparedQuery queriedComments = queryComments("timestamp", false);

    List<Comment> comments = new ArrayList<>();
    for (Entity commentEntity : queriedComments.asIterable()) {
      long id = commentEntity.getKey().getId();
      String name = (String) commentEntity.getProperty("name");
      long timestamp = (long) commentEntity.getProperty("timestamp");
      String message = (String) commentEntity.getProperty("message");

      Comment comment = new Comment(id, name, timestamp, message);
      comments.add(comment);
    }

    response.setContentType("application/json;");
    response.getWriter().println(convertToJson(comments));
  }

  /* Adds the request comment to comments arraylist */
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String name = request.getParameter("name");
    String message = request.getParameter("message");
    long timestamp = System.currentTimeMillis();

    Entity newComment = new Entity("Comment");

    newComment.setProperty("name", name);
    newComment.setProperty("timestamp", timestamp);
    newComment.setProperty("message", message);

    DatastoreServiceFactory.getDatastoreService().put(newComment);

    response.sendRedirect("/");
  }
}
