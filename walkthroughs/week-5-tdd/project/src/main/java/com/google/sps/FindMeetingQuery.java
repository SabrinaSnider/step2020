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

package com.google.sps;

import java.util.List;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

public final class FindMeetingQuery {
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    // if no attendees, return all day
    if (request.getAttendees().isEmpty()) return Arrays.asList(TimeRange.WHOLE_DAY);

    Collection<TimeRange> availableTimes = new ArrayList<TimeRange>();

    // if request is longer than a day, return no events
    if (request.getDuration() > TimeRange.WHOLE_DAY.duration()) return availableTimes;

    // make a sorted list of the events
    List<Event> eventList = new ArrayList(events);
    Collections.sort(eventList, (Event e1, Event e2) -> TimeRange.ORDER_BY_START.compare(e1.getWhen(), e2.getWhen()));

    int theoreticalStart = TimeRange.START_OF_DAY;
    for (Event event: events) {
      // if theoretical start happens before the event starts
      if (theoreticalStart < event.getWhen().start()) {
        if (theoreticalStart + request.getDuration() < event.getWhen().end()) {
          // if theoretical end happens before the event starts, add it
          availableTimes.add(TimeRange.fromStartEnd(theoreticalStart, event.getWhen().end(), false));
        }

        // move theoretical start pointer
        theoreticalStart = event.getWhen().end();
        continue;
      } else if (theoreticalStart > event.getWhen().start() && theoreticalStart < event.getWhen().end()) {
        // if nextAvailableStart is in the middle of the event, move nextAvailableStart to after the event
        theoreticalStart = event.getWhen().end();
        continue;
      }
    }

    // if there is time after all of the events, return that time
    if (theoreticalStart + request.getDuration() <= TimeRange.END_OF_DAY) {
      availableTimes.add(TimeRange.fromStartEnd(theoreticalStart, TimeRange.END_OF_DAY, true));
    }

    return availableTimes;
  }
}
