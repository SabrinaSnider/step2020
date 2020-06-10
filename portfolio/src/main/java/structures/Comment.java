package structures;

import java.util.Optional;

import com.google.appengine.api.datastore.Entity;

public class Comment {
  private long id;
  private long timestamp;
  private String message;
  private String email;
  private Optional<String> image;

  public Comment(Entity commentEntity) {
    this.id = commentEntity.getKey().getId();
    this.email = (String) commentEntity.getProperty("email");
    this.timestamp = (long) commentEntity.getProperty("timestamp");
    this.message = (String) commentEntity.getProperty("message");
    this.image = Optional.ofNullable((String) commentEntity.getProperty("image"));
  }

  public long getId() { return id; }
  public String getEmail() { return email; }
  public long getTimestamp() { return timestamp; }
  public String getMessage() { return message; }
  public Optional<String> getImage() { return image; }
}
