
export function createQrCodeDetails (event,user){

    const qrCodeDetails =
        "Event Title: " + event.title + "\n" +
        "Event Date: " + event.startDate + "\n" +
        "Event Location: " + event.location + "\n" +
        "Event Language: " + event.language + "\n" +

        "Participant Username: " + user.username + "\n" +
        "Participant Name: " + user.name + "\n" +
        "Participant Surname: " + user.surName + "\n\n" +
        "Ticket Created Date: " + new Date() + "\n"

    return qrCodeDetails;
}