function outputArcCalendarEvents() {
   var calendarId = 'grubhub.com_qojpsj5r6pgki3rvjk07qbhtn8@group.calendar.google.com';
   var events = Calendar.Events.list(calendarId, {'maxResults': 2500, 'showDeleted': false, 'orderBy': 'startTime', 'singleEvents': true});

    try {
    const doc = DocumentApp.openByUrl("https://docs.google.com/document/d/1uNopCLhtizI4gneVEI9Zo9pHbits4xFCNm77kZWqKqI/")

    var body = doc.getBody();
    body.clear();
    var text = body.editAsText();
    var curr_row = '';
    var offset = 0;
    for (var i = events.items.length - 1; i >= 0; i--) {
      var event = events.items[i];
      var localDate = event.start.dateTime.substring(0,10)
      curr_row = localDate + ":       " + event.summary + "\n\n"
      text.appendText(curr_row)
      Logger.log("Offset = %d, Length of curr_row = %d, i = %d, link = %s", offset, curr_row.length, i, event.htmlLink)
      text.setLinkUrl(offset, offset + curr_row.length - 1, event.htmlLink)
      offset = offset + curr_row.length
    }
  } catch (err) {
    Logger.log('Failed with error %s', err.message);
  }
}


