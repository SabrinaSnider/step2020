package structures;

import com.google.appengine.api.datastore.Entity;

public class Comment {
  private long id;
  private String name;
  private long timestamp;
  private String message;

  public Comment(Entity commentEntity) {
    this.id = commentEntity.getKey().getId();
    this.name = (String) commentEntity.getProperty("name");
    this.timestamp = (long) commentEntity.getProperty("timestamp");
    this.message = (String) commentEntity.getProperty("message");
  }

  public long getId() { return id; }
  public String getName() { return name; }
  public long getTimestamp() { return timestamp; }
  public String getMessage() { return message; }

  public void setName(String name) { this.name = name; }
  public void setTimestamp(long timestamp) { this.timestamp = timestamp; }
  public void setMessage(String message) { this.message = message; }
}
