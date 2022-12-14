import request from "request";

require("dotenv").config();
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const IMAGE_GET_STARTED = 'shorturl.at/krwY3';
const IMAGE_GET_STARTED0101 = 'ahiahiaihaia';
const IMAGE_GET_STARTED1 = 'shorturl.at/krwY3';
const IMAGE_GET_STARTED2 = 'shorturl.at/krwY3';
const IMAGE_GET_STARTED3 = 'shorturl.at/krwY3';
const IMAGE_GET_STARTED4 = 'shorturl.at/krwY3';
let callSendAPI = async (sender_psid, response) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }
    await sendMarkReadMessage(sender_psid);
    await sendTypingOn(sender_psid);
    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v9.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}

let sendTypingOn = (sender_psid) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "sender_action": "typing_on"
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v9.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sendTypingOn!')
        } else {
            console.error("Unable to sendTypingOn message:" + err);
        }
    });
}

let sendMarkReadMessage = (sender_psid) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "sender_action": "mark_seen"
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v9.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sendMarkReadMessage!')
        } else {
            console.error("Unable to sendMarkReadMessage message:" + err);
        }
    });
}
let getUserName = (sender_psid, response) => {
    // Construct the message body
    return new Promise(async (resolve, reject) => {

        // Send the HTTP request to the Messenger Platform
        await request({
            "uri": `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
            "method": "GET",
        }, (err, res, body) => {
            if (!err) {
                body = JSON.parse(body);
                let userName = `${body.last_name} ${body.first_name}`;
                resolve(userName);
            } else {
                console.error("Unable to send message:" + err);
                reject(err);
            }
        });
    })
}
let handleGetStarted = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userName = await getUserName(sender_psid);
            let response = { "text": `Ch??o m???ng b???n ${userName} ?????n v???i App BookingCare!` }
            await callSendAPI(sender_psid, response);

            let response2 = sendGetStartedTemplate();
            await callSendAPI(sender_psid, response2);

            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

let sendGetStartedTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "Xin ch??o m???ng b???n ?????n v???i Bookingcare",
                    "subtitle": "M???i b???n vui l??ng l???a ch???n nh???ng y??u c???u sau ????y : ",
                    "image_url": IMAGE_GET_STARTED,
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "Menu ch??nh!",
                            "payload": "MAIN_MENU",
                        },
                        {
                            "type": "web_url",
                            "url": `${process.env.URL_WEB_VIEW_ORDER}`,
                            "title": "Ph???n h???i khi???u n???i!",
                            "webview_height_ratio": "tall",
                            "messenger_extensions": true
                        },
                        {
                            "type": "postback",
                            "title": "H?????ng d???n s??? d???ng Bot chat",
                            "payload": "Guide to use",
                        }
                    ],
                }]
            }
        }
    }
    return response;
}

let handleSendMainMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = getMainMenuTemplate();
            await callSendAPI(sender_psid, response);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}
let getMainMenuTemplate = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Xin ch??o m???ng b???n ?????n v???i Bookingcare",
                        "subtitle": "Sau ????y l?? th??ng tin c???a ch??ng t??i ",
                        "image_url": IMAGE_GET_STARTED1,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "C?? s??? v???t ch???t!",
                                "payload": "CSVC",
                            },
                            {
                                "type": "postback",
                                "title": "?????i ng?? b??c s??",
                                "payload": "DNBS",
                            }

                        ],
                    },
                    {
                        "title": "Gi??? m??? c???a",
                        "subtitle": "T2-T6 || 6A.M - 17P.M",
                        "image_url": IMAGE_GET_STARTED2,
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": `${process.env.URL_WEB_VIEW_ORDER}`,
                                "title": "Ph???n h???i khi???u n???i!",
                                "webview_height_ratio": "tall",
                                "messenger_extensions": true
                            }
                        ],
                    },
                    {
                        "title": "?????a ch??? b???nh vi???n Nhi ?????ng 2",
                        "subtitle": "14 L?? T??? Tr???ng, B???n Ngh??, Qu???n 1, Th??nh ph??? H??? Ch?? Minh",
                        "image_url": IMAGE_GET_STARTED3,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Chi ti???t ?????a ch???",
                                "payload": "SHOW_ROOMS",
                            }
                        ],
                    }
                ]
            }
        }
    }
    return response;
}



let handleSendCSVC = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = getMainMenuTemplateCSVC();
            await callSendAPI(sender_psid, response);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

let getMainMenuTemplateCSVC = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Xin ch??o m???ng b???n ?????n v???i Bookingcare",
                        "subtitle": "Sau ????y l?? th??ng tin v??? c?? s??? v???t ch???t c???a ch??ng t??i",
                        "image_url": IMAGE_GET_STARTED1,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Xem chi ti???t v??? c?? s??? v???t ch???t!",
                                "payload": "VIEW",
                            }

                        ],
                    },
                    {
                        "title": "Gi???i thi???u v??? b???nh vi???n Nhi ?????ng 2",
                        "subtitle": "https://www.youtube.com/watch?v=zuCPZfrQZhM&ab_channel=N%26N",
                        "image_url": IMAGE_GET_STARTED2,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Xem th??ng tin v??? b???nh vi???n!",
                                "payload": "VIEW_CSVC",
                            }
                        ],
                    },
                    {
                        "title": "Quay l???i",
                        "subtitle": "Quay tr??? l???i Menu ch??nh",
                        "image_url": IMAGE_GET_STARTED2,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Return",
                                "payload": "BACK_BACK",
                            }
                        ],
                    }
                ]
            }
        }
    }
    return response;
}
let handleSendDNBS = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = getMainMenuTemplateDNBS();
            await callSendAPI(sender_psid, response);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}
let getMainMenuTemplateDNBS = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Xin ch??o m???ng b???n ?????n v???i Bookingcare",
                        "subtitle": "Sau ????y l?? th??ng tin c???a ch??ng t??i ",
                        "image_url": IMAGE_GET_STARTED1,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "?????i ng?? b??c s??!",
                                "payload": "VIEW_DNBS",
                            }

                        ],
                    },
                    {
                        "title": "Quay l???i",
                        "subtitle": "Quay tr??? l???i Menu ch??nh",
                        "image_url": IMAGE_GET_STARTED2,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Return",
                                "payload": "BACK_BACK",
                            }
                        ],
                    }
                ]
            }
        }
    }
    return response;
}
let handleBackBack = async (sender_psid) => {
    await handleSendMainMenu(sender_psid);
}

let getMainMenuTemplateCSVC1 = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Xin ch??o m???ng b???n ?????n v???i Bookingcare",
                        "subtitle": "Sau ????y l?? th??ng tin v??? b???nh vi???n c???a ch??ng t??i ",
                        "image_url": IMAGE_GET_STARTED1,

                    },
                    {
                        "title": "Quay l???i",
                        "subtitle": "Quay tr??? l???i Menu ch??nh",
                        "image_url": IMAGE_GET_STARTED2,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Return",
                                "payload": "BACK_BACK",
                            }
                        ],
                    }
                ]
            }
        }
    }
    return response;
}

let getMainMenuTemplateCSVC2 = () => {
    let response = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Xin ch??o m???ng b???n ?????n v???i Bookingcare",
                        "subtitle": "Sau ????y l?? th??ng tin v??? c?? s??? v???t ch???t c???a ch??ng t??i ",
                        "image_url": IMAGE_GET_STARTED0101,

                    },
                    {
                        "title": "Quay l???i",
                        "subtitle": "Quay tr??? l???i Menu ch??nh",
                        "image_url": IMAGE_GET_STARTED2,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Return",
                                "payload": "BACK_BACK",
                            }
                        ],
                    }
                ]
            }
        }
    }
    return response;
}

let getMainMenuTemplateDNBS1 = () => {

}


let handleSendCSVC1 = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = getMainMenuTemplateCSVC1();
            await callSendAPI(sender_psid, response);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}

let handleSendCSVC2 = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = getMainMenuTemplateCSVC2();
            await callSendAPI(sender_psid, response);
            resolve('done');
        } catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    callSendAPI: callSendAPI,
    handleGetStarted: handleGetStarted,
    getUserName: getUserName,
    handleSendMainMenu: handleSendMainMenu,
    handleSendCSVC: handleSendCSVC,
    handleSendDNBS: handleSendDNBS,
    handleBackBack: handleBackBack,
    getMainMenuTemplateCSVC1: getMainMenuTemplateCSVC1,
    getMainMenuTemplateCSVC2: getMainMenuTemplateCSVC2,
    getMainMenuTemplateDNBS1: getMainMenuTemplateDNBS1,
    handleSendCSVC1: handleSendCSVC1,
    handleSendCSVC2: handleSendCSVC1
}