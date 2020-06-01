package structures;

public class Comment {
  private long id;
  private String name;
  private long timestamp;
  private String message;


  public Comment(long id, String name, long timestamp, String message) {
    this.id = id;
    this.name = name;
    this.timestamp = timestamp;
    this.message = message;
  }

  public long getId() { return id; }
  public String getName() { return name; }
  public long getTimestamp() { return timestamp; }
  public String getMessage() { return message; }

  public void setName(String name) { this.name = name; }
  public void setTimestamp(long timestamp) { this.timestamp = timestamp; }
  public void setMessage(String message) { this.message = message; }
}
