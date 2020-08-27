


export function createNotificationDto(event, user) {
    return JSON.stringify({
        eventName: event.title,
        participantName: user.name + " " + user.surName,
        participantUsername: user.username,
        message: user.name + " participated to your event !",
        title: "News from " + event.title,
        type: 1
    })
}

export function createQrCodeEmailDto(event,user,qrCodeImage) {
    return {
        base64ImageUrl: qrCodeImage,
        eventTitle: event.title,
        participantName: user.name,
        participantEmail: "umut265@gmail.com",
        eventUrl: window.location.href,
    }
}