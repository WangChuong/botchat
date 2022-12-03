import request from "request";

require("dotenv").config();
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const IMAGE_GET_STARTED = 'shorturl.at/krwY3';
const IMAGE_GET_STARTED0101 = 'ahiahiaihaia';
const IMAGE_GET_STARTED1 = 'shorturl.at/krwY3';
const IMAGE_GET_STARTED2 = 'shorturl.at/krwY3';
const IMAGE_GET_STARTED3 = 'shorturl.at/krwY3';
const IMAGE_GET_STARTED4 = 'shorturl.at/krwY3';
let callSendAPI = (sender_psid, response) => {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

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
            let response = { "text": `Chào mừng bạn ${userName} đến với App BookingCare!` }
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
                    "title": "Xin chào mừng bạn đến với Bookingcare",
                    "subtitle": "Mời bạn vui lòng lựa chọn những yêu cầu sau đây : ",
                    "image_url": IMAGE_GET_STARTED,
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "Menu chính!",
                            "payload": "MAIN_MENU",
                        },
                        {
                            "type": "postback",
                            "title": "Đặt lịch!",
                            "payload": "RESERVE",
                        },
                        {
                            "type": "postback",
                            "title": "Hướng dẫn sử dụng Bot chat",
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
                        "title": "Xin chào mừng bạn đến với Bookingcare",
                        "subtitle": "Sau đây là thông tin của chúng tôi ",
                        "image_url": IMAGE_GET_STARTED1,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Cơ sở vật chất!",
                                "payload": "CSVC",
                            },
                            {
                                "type": "postback",
                                "title": "Đội ngũ bác sĩ",
                                "payload": "DNBS",
                            }

                        ],
                    },
                    {
                        "title": "Giờ mở cửa",
                        "subtitle": "T2-T6 || 6A.M - 17P.M",
                        "image_url": IMAGE_GET_STARTED2,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Đặt lịch!",
                                "payload": "RESERVE",
                            }
                        ],
                    },
                    {
                        "title": "Địa chỉ bệnh viện Nhi Đồng 2",
                        "subtitle": "14 Lý Tự Trọng, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh",
                        "image_url": IMAGE_GET_STARTED3,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Chi tiết địa chỉ",
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
                        "title": "Xin chào mừng bạn đến với Bookingcare",
                        "subtitle": "Sau đây là thông tin về cơ sở vật chất của chúng tôi",
                        "image_url": IMAGE_GET_STARTED1,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Xem chi tiết về cơ sở vật chất!",
                                "payload": "VIEW",
                            }

                        ],
                    },
                    {
                        "title": "Giới thiệu về bệnh viện Nhi Đồng 2",
                        "subtitle": "https://www.youtube.com/watch?v=zuCPZfrQZhM&ab_channel=N%26N",
                        "image_url": IMAGE_GET_STARTED2,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Xem thông tin về bệnh viện!",
                                "payload": "VIEW_CSVC",
                            }
                        ],
                    },
                    {
                        "title": "Quay lại",
                        "subtitle": "Quay trở lại Menu chính",
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
                        "title": "Xin chào mừng bạn đến với Bookingcare",
                        "subtitle": "Sau đây là thông tin của chúng tôi ",
                        "image_url": IMAGE_GET_STARTED1,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Đội ngũ bác sĩ!",
                                "payload": "VIEW_DNBS",
                            }

                        ],
                    },
                    {
                        "title": "Quay lại",
                        "subtitle": "Quay trở lại Menu chính",
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
                        "title": "Xin chào mừng bạn đến với Bookingcare",
                        "subtitle": "Sau đây là thông tin về bệnh viện của chúng tôi ",
                        "image_url": IMAGE_GET_STARTED1,
                       
                    },
                    {
                        "title": "Quay lại",
                        "subtitle": "Quay trở lại Menu chính",
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
                        "title": "Xin chào mừng bạn đến với Bookingcare",
                        "subtitle": "Sau đây là thông tin về cơ sở vật chất của chúng tôi ",
                        "image_url": IMAGE_GET_STARTED0101,
                       
                    },
                    {
                        "title": "Quay lại",
                        "subtitle": "Quay trở lại Menu chính",
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