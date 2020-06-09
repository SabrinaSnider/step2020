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

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.EntityNotFoundException;
import com.google.appengine.api.datastore.KeyFactory;
import com.google.appengine.api.users.UserService;
import com.google.appengine.api.users.UserServiceFactory;

/* Servlet that adds a comment to the dataserve. */
@WebServlet("/delete-comment")
public class DeleteCommentServlet extends HttpServlet {

  /* Removes the request comment from the datastore */
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    UserService userService = UserServiceFactory.getUserService();

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    long id = Long.parseLong(request.getParameter("id"));
    String currentUserEmail = userService.getCurrentUser().getEmail();

    try {
      Entity comment = datastore.get(KeyFactory.createKey("Comment", id));

      // Don't allow if not an admin and not their comment
      if (!userService.isUserAdmin() && comment.getProperty("email") != currentUserEmail) return; 

      datastore.delete(comment.getKey());
    } catch (EntityNotFoundException e) {
      return;
    }
  }
}
