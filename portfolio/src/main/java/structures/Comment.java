package structures;

import com.google.appengine.api.datastore.Entity;

public class Comment {
  private long id;
  private long timestamp;
  private String message;
  private String email;
  private String image;

  public Comment(Entity commentEntity) {
    this.id = commentEntity.getKey().getId();
    this.email = (String) commentEntity.getProperty("email");
    this.timestamp = (long) commentEntity.getProperty("timestamp");
    this.message = (String) commentEntity.getProperty("message");
    this.image = commentEntity.getProperty("image") != null ? (String) commentEntity.getProperty("image") : null; 
  }

  public long getId() { return id; }
  public String getEmail() { return email; }
  public long getTimestamp() { return timestamp; }
  public String getMessage() { return message; }

  public void setMessage(String message) { this.message = message; }
}
