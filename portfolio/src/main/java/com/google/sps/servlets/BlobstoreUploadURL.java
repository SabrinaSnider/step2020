package com.google.sps.servlets;

import java.io.IOException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.appengine.api.blobstore.BlobstoreServiceFactory;

/* Creates and returns a blobstore upload link for images */
@WebServlet("/blobstore-upload")
public class BlobstoreUploadURL extends HttpServlet {

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String uploadUrl = BlobstoreServiceFactory.getBlobstoreService().createUploadUrl("/");
    response.setContentType("text/html");
    response.getWriter().println(uploadUrl);
  }
}
