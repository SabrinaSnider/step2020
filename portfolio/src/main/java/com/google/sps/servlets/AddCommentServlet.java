package com.google.sps.servlets;

import com.google.appengine.api.blobstore.BlobInfo;
import com.google.appengine.api.blobstore.BlobInfoFactory;
import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.images.ImagesService;
import com.google.appengine.api.images.ImagesServiceFactory;
import com.google.appengine.api.images.ServingUrlOptions;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.Optional;

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
    Optional<String> image = getUploadedFileUrl(request);

    Entity newComment = new Entity("Comment");

    newComment.setProperty("email", email);
    newComment.setProperty("timestamp", timestamp);
    newComment.setProperty("message", message);
    image.ifPresent(url -> newComment.setProperty("image", url));

    DatastoreServiceFactory.getDatastoreService().put(newComment);
  }

  /** Returns the URL to the uploaded file or null if the user didn't upload a file. */
  private Optional<String> getUploadedFileUrl(HttpServletRequest request) {
    BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
    List<BlobKey> allCommentImageKeys = blobstoreService.getUploads(request).get("image");

    // User submitted form without selecting a file (on dev server)
    if (allCommentImageKeys == null || allCommentImageKeys.isEmpty()) return Optional.empty();

    // Since users can only upload one image per comment, get the first image
    BlobKey imageKey = allCommentImageKeys.get(0);
    BlobInfo imageInfo = new BlobInfoFactory().loadBlobInfo(imageKey);
    
    // User submitted form without selecting a file (on live server)
    if (imageInfo.getSize() == 0) {
      blobstoreService.delete(imageKey);
      return Optional.empty();
    }

    // Use ImagesService to get a URL that points to the uploaded file.
    ImagesService imagesService = ImagesServiceFactory.getImagesService();
    ServingUrlOptions options = ServingUrlOptions.Builder.withBlobKey(imageKey);

    // To support AppEngine's devserver, use the relative image path instead of
    // the path returned by imagesService (which contains a host)
    try {
      URL url = new URL(imagesService.getServingUrl(options));
      return Optional.ofNullable(url.getPath());
    } catch (MalformedURLException e) {
      return Optional.ofNullable(imagesService.getServingUrl(options));
    }
  }
}
