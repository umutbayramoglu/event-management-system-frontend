const convertLocationForRequest = (locationInfo) => {
    return locationInfo.address + "-" + locationInfo.lat + "-" + locationInfo.lng;
}

const convertLocationToShow = (locationInfo) => {
    const infoArr = locationInfo.split("-");
    const convertedInfo = {eventLocationAddress: infoArr[0], lat : infoArr[1], lng : infoArr[2]};
    return convertedInfo;
}

export {convertLocationForRequest,convertLocationToShow};
