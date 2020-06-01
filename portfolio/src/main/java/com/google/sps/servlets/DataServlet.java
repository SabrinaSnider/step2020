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
import com.google.gson.Gson;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import structures.Comment;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/comment")
public class DataServlet extends HttpServlet {

  ArrayList<Comment> comments = new ArrayList<Comment>();

  /* Converts the comments arraylist to a json String */
  private String convertToJson(ArrayList<Comment> data) {
    Gson gson = new Gson();
    return gson.toJson(data);
  }

  /* Returns a json string of the comments */
  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String json = convertToJson(comments);

    response.setContentType("application/json");
    response.getWriter().println(json);
  }

  /* Adds the request comment to comments */
  @Override
  public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String name = request.getParameter("name");
    String message = request.getParameter("message");

    System.out.println("name: " + name + ", message: " + message);

    Comment newComment = new Comment(name, message);

    comments.add(newComment);
  }
}
