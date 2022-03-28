function calendarEmailReminder() {
  var tod = new Date();
  var tomm = new Date(tod);
  tomm.setDate(tomm.getDate() + 1);

  const email = Session.getActiveUser().getEmail();
  const my_login = Session.getActiveUser().getUserLoginId();
  var events_for_tomm = tomm.toDateString()+ ": Schedule for " + my_login
  const subject = events_for_tomm;
  var my_body = "\n\n"

  var events2 = CalendarApp.getEventsForDay(tomm)
  for (var i = 0; i < events2.length; i++) {
    var i_event = events2[i];
    my_body += i_event.getStartTime().toLocaleTimeString() + " - " + i_event.getEndTime().toLocaleTimeString() + " \t:\t" + i_event.getTitle() + "\n\n"
  }
  Logger.log("Subject:  %s", subject)
  Logger.log("Body: %s", my_body)
  if (my_body === "\n\n" && events2.length === 0) {
    my_body = "\n\n\nNo events scheduled for today."
  }
  try {
    GmailApp.sendEmail(email, subject, my_body);
  } catch (err) {
    Logger.log('Failed with error %s', err.message);
  }
}

function doGet(e) {
  calendarEmailReminder()  
}
