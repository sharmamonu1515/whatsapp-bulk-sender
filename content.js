const body = document.querySelector('body');
const DEFAULT_MIN_DELAY = 3;
const DEFAULT_MAX_DELAY = 6;

const rocketImg = chrome.runtime.getURL('images/rocket_icon.svg');
const whatsappBotImg = chrome.runtime.getURL("images/whatsapp-bot.png");
const stopIcon = chrome.runtime.getURL("images/stop_icon.svg");

(function addWhatsappForm() {
    const html = `
    <style>
        .ak-whatsapp-popup-toggler {
            border-radius: 50%;
            width: 50px;
            height: 50px;
            background: #0f756a;
            position: absolute;
            right: 20px;
            top: 20px;
            align-content: center;
            text-align: center;
            z-index: 999;
            cursor: pointer;
            color: #fff;
        }
        .ak-whatsapp-popup-toggler img {
            width: 100%;
        }
        .ak-popup-container {
            position: fixed;
            background: white;
            right: 20px;
            top: 20px;
            z-index: 999;
            color: black;
            padding: 21.92px 24px 20px;
            box-sizing: border-box;
            font-family: "Segoe UI", "Helvetica Neue", Helvetica, "Lucida Grande", Arial, Ubuntu, Cantarell, "Fira Sans", sans-serif;
            border: 3px solid #0f756a;
            border-radius: 4px;
            background: #fff4f4;
            max-width: 385px;
            min-width: 385px;
            max-height: 80%;
            overflow-x: hidden;
            box-shadow: 0 1.062em 3.125em 0 rgba(11, 20, 26, 0.19),0 0.75em 0.937em 0 rgba(11, 20, 26, 0.24);
        }
        .ak-popup-container *::selection {
            user-select: unset !important;
            background: #0f756a !important;
        }
        .ak-popup-container h1 {
            font-size: 24px;
            margin-bottom: 18px;
            text-align: center;
            font-weight: bold;
        }
        .ak-popup-container ul.nav.nav-tabs li.nav-item a {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            gap: 3px;
            border: 2px solid #0f756a;
            background-color: #bbe3e0;
            color: rgb(33, 37, 41);
            height: 15px;
        }
        .ak-popup-container .mb-3 {
            margin-bottom: 1rem;
        }
        .ak-popup-container .form-label {
            display: flex;
            align-items: center;
            gap: 5px;
            max-width: 100%;
            margin-bottom: 4.992px;
            font-size: 14px;
            font-weight: 700;
        }
        .ak-popup-container .form-control {
            width: 100%;
            padding: 6px 12px;
            font-size: 14px;
            border-radius: 4px;
            height: 40px;
            border: 2px solid #0f756a;
            box-sizing: border-box;
            background: white !important;
            color: #555 !important;
        }
        .ak-popup-container .form-control, ::placeholder, .help-text {
            font-family: "Segoe UI", "Helvetica Neue", Helvetica, "Lucida Grande", Arial, Ubuntu, Cantarell, "Fira Sans", sans-serif;
        }
        .ak-popup-container .form-control::placeholder {
            color: #555 !important;
        }
        .ak-popup-container textarea.form-control {
            min-height: 60px;
            font-size: 12.8px;
            line-height: 1.42857143;
        }
        .ak-popup-container .row {
            display: flex;
            gap: 30px;
        }
        .ak-popup-container .row .col {
            width: 100%;
        }
        .ak-popup-container ul.nav.nav-tabs {
            margin-bottom: 30px;
        }
        .ak-popup-container .tab-content, #akSendAttachment {
            display: none;
        }
        .ak-popup-container .tab-content.active {
            display: block;
        }
        .ak-popup-container .nav.nav-tabs {
            display: flex;
            justify-content: center;
        }
        .ak-popup-container .nav.nav-tabs li:first-child a
        {
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
        }
        .ak-popup-container .nav.nav-tabs li:last-child a  {
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
        }
        .ak-popup-container .nav.nav-tabs li:not(:first-child):not(:last-child) a {
            border-left: 0;
            border-right: 0;
        }
        .ak-popup-container .nav.nav-tabs a {
            padding: 7px 10px;;
            transition: 0.3s linear;
        }
        .ak-popup-container ul.nav.nav-tabs li.nav-item a.active,
        .ak-popup-container ul.nav.nav-tabs li.nav-item a:hover {
            background: #0f756a;
            color: white;
        }
        .ak-popup-container ul.nav.nav-tabs li.nav-item a.active svg, .ak-popup-container ul.nav.nav-tabs li.nav-item a:hover svg {
            fill: #fff;
        }
        .ak-popup-container button.close {
            position: absolute;
            right: 15px;
            top: 15px;
            font-size: 24px;
            font-weight: 700;
            line-height: 1;
            color: #000;
            text-shadow: 0 1px 0 #fff;
            opacity: .5;
        }
        .ak-popup-container button#rsio2-whatsapp-rocket-button {
            width: 40px;
            padding: 8px;
            font-size: 22px;
            background-color: bisque;
        }
        .ak-logs-popup-container {
            display: none;
        }
        .ak-logs-popup-container.active {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 999;
            background: rgb(15 117 106 / 70%);
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .ak-logs-popup-container.active .ak-logs-popup-body {
            max-width: 240px;
            width: 100%;
        }
        .ak-logs-popup-container .ak-logs-popup-body h2 {
            font-size: 21px !important;
            color: #fff;
            display: block;
            text-align: center;
        }

        .ak-popup-container .btn-sm, #akSendMessage {
            text-transform: none;
            border: 2px solid #0f756a;
            background-color: #bbe3e0;
            color: rgb(33, 37, 41);
            font-size: 14px;
            padding: 5px 8px;
            box-shadow: none;
        }
        #akSendMessage {
            max-width: 150px;
            width: 100%;
        }
        .ak-popup-container .btn-sm:hover, #akSendMessage:hover  {
            background-color: #0f756a;
            color: #fff;
        }
        .send-attachment-switch {
            height: 24px;
            border: 2px solid #0f756a;
            width: 40px !important;
            margin-right: 6px !important;
        }
        .form-check-label {
            font-weight: 700;
            font-size: 14px;
        }
        input::file-selector-button {
            background: #bbe3e0;
            border: 2px solid #0f756a;
            margin-top: 1px;
        }

        .help-text {
            font-size: 12px;
            color: rgb(33, 37, 41);
            line-height: normal;
        }
        .ak-popup-container .input-number .form-control {
            width: 37.2px;
            padding: 2px;
            height: 31.2px;
            text-align: center;
        }
        .input-title, .input-number {
            display: inline;
        }
        #tab-send-csv select {
            width: 85%;
            padding: 5px;
            color: #000 !important;
            height: 34px;
            border-radius: 5px !important;
            font-family:"SF Pro Text", "SF Pro Icons", system, -apple-system, system-ui, BlinkMacSystemFont, "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande", "Kohinoor Devanagari", sans-serif
        }
        #akSelectedPhoneNumbers ul  {
            max-height: 72px;
            overflow-y: auto;
            margin-top: 4.992px;
            margin-bottom: 2px;
        }
        #akSelectedPhoneNumbers ul li {
            display: inline-block;
            padding: 2px 3px 4px 3px;
            font-size: 13px;
            line-height: 1;
            text-align: center;
            white-space: nowrap;
            vertical-align: baseline;
            border-radius: 4px;
            color: #212529;
            background-color: #bbe3e0;
            margin: 0 0 3px 3px;
            border: #0f756a 1px solid;
        }
        .ak-logs-popup-container.active .btn-primary {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            border: 2px solid #0f756a;
            background-color: #bbe3e0;
            color: rgb(33, 37, 41);
            max-width: 150px;
            width: 100%;
            text-transform: none;
            transition: 0.3s;
            margin: 10px auto 0;
            padding: 8px 5px;
        }
        .ak-logs-popup-container.active .btn-primary:hover  {
            background-color: #0f756a;
            color: #fff;
        }
        .ak-logs-popup-container.active .btn-primary span {
            width: 18px;
        }

    </style>
    <div class="ak-popup-container" style="display:none">
        <button type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        <div class="container">
            <h1>WA Bulk Sender</h1>
            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class="nav-link active" href="#" data-tab-target="tab-send-number">
                    <span><img src="${rocketImg}" style="width: 15px; height: 15px; position: relative; top: 1px;">
                    </span>
                    Sender</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" data-tab-target="tab-send-csv">
                    <span class="modal-svg">
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"></rect></g><g><path d="M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M7,9l1.41,1.41L11,7.83V16h2V7.83l2.59,2.58L17,9l-5-5L7,9z"></path></g></svg>
                    </span>
                    Upload CSV</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" data-tab-target="tab-settings">
                    <span class="modal-svg">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"></path><path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></svg>
                    </span>
                    
                    Settings</a>
                </li>
            </ul>
            <div class="tab-content active" id="tab-send-number">
                <div class="mb-3">
                    <label for="akPhoneNumber" class="form-label">Phone numbers(separate with comma or newline):</label>
                    <textarea id="akPhoneNumber" placeholder="Enter phone numbers. Separate using comma or newline." class="form-control"></textarea>
                    <div class="help-text">Enter phone numbers in 17133003000 or +17133003000 format. Country code in front. Separate phone numbers using comma or newline.</div>
                </div>

                <div class="mb-3">
                    <label for="akMessageNumber" class="form-label">Message:</label>
                    <textarea id="akMessageNumber" placeholder="Enter message" class="form-control"></textarea>
                </div>
            </div>
            <div class="tab-content" id="tab-send-csv">
                <div class="mb-3">
                    <label for="akCsvFile" class="form-label">Upload CSV File:</label>
                    <input type="file" id="akCsvFile" accept=".csv" class="form-control">
                </div>
                <div id="csvFields" class="mt-3 mb-3"></div>
                <!-- <div class="mb-3 form-check form-switch">
                    <input class="form-check-input send-attachment-switch" type="checkbox" id="dynamicMessageCheckbox">
                    <label class="form-check-label" for="dynamicMessageCheckbox">Use Dynamic Message</label>
                </div> -->
                <div class="mb-3" id="dynamicMessageSelectBox" style="display: none;">
                    <label for="dynamicMessageField" class="form-label">Select Field for Dynamic Message:</label>
                    <select id="dynamicMessageField" class="form-control">
                        <option> Select field </option>
                        <!-- Dynamically populated options will be added here -->
                    </select>
                </div>
                <div class="mb-3" id="simpleMessageField">
                    <label for="akMessageCSV" class="form-label">Message:</label>
                    <textarea id="akMessageCSV" placeholder="Enter message" class="form-control"></textarea>
                </div>
            </div>

            <div class="tab-content common-fields tab-send-number tab-send-csv active">
                <div class="mb-3 form-check form-switch">
                    <input class="form-check-input send-attachment-switch" type="checkbox" id="akAttachToggle">
                    <label class="form-check-label" for="akAttachToggle">Add attachment</label>
                </div>
    
                <div class="mb-3">
                    <button id="akSendAttachment" class="btn btn-secondary btn-sm">Attach Attachment</button>
                </div>

                <div class="row mb-3">
                    <div class="col">
                        <span class="two-input-style"><div class="input-title">Add a random time delay of </div><div class="input-number"><input type="number" id="akMinDelay" value="${DEFAULT_MIN_DELAY}" class="form-control" value=""></div> <div class="input-number">and <input type="number" id="akMaxDelay" value="${DEFAULT_MAX_DELAY}" class="form-control" value=""></div> <div class="inout-title">seconds between messages.</div></span>
                    </div>
                </div>

                <button id="akSendMessage" class="btn btn-primary">
                <span><img src="${rocketImg}" style="width: 15px; height: 15px; position: relative; top: 1px;"></span> Send Message</button>
            </div>

            <div class="tab-content" id="tab-settings">
                <div class="row mb-3">
                    <div class="col">
                        <label class="form-label">Download all the usage logs we have stored as CSV.</label>
                        <button id="akDownloadReport" class="btn btn-primary btn-sm">Download Report</button>
                    </div>
                </div>
                <div class="row mb-3">
                    <div class="col">
                        <label class="form-label">Delete all usage logs we have stored locally on the browser.</label>
                        <button id="akDeleteReport" class="btn btn-primary btn-sm">Delete Report</button>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <div class="ak-whatsapp-popup-toggler">
        <img src="${whatsappBotImg}">
    </div>
    `;

    const newElement = document.createElement('div');
    newElement.innerHTML = html;
    body.appendChild(newElement);
})()

const popupContainer = document.querySelector('.ak-popup-container')
const popupToggler =  document.querySelector('.ak-whatsapp-popup-toggler');
const popupCloseBtn = document.querySelector('.ak-popup-container button.close');

const showMainPopup = () => {
    popupContainer.style.display = 'block';
    popupToggler.style.display = 'none';
}

const closeMainPopup = () => {
    popupContainer.style.display = 'none';
    popupToggler.style.display = '';
}

const initializeTabs = () => {
    const tabs = document.querySelectorAll('[data-tab-target]');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetId = tab.dataset.tabTarget;
            const targetContent = document.querySelector(`#${targetId}`);

            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });

            targetContent.classList.add('active');

            const commonTarget = document.querySelector('.common-fields');
            if ( targetId === 'tab-settings' ) {
                commonTarget.classList.remove('active')
            } else {
                commonTarget.classList.add('active')
            }

            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });

            tab.classList.add('active');
        });
    });
}

const simulatePasteEvent = (element, text) => {
    // Select all child elements of the given element
    var children = element.querySelectorAll("*");
    
    const dataTransfer = new DataTransfer();
    dataTransfer.setData('text', text);
    const event = new ClipboardEvent('paste', {
        clipboardData: dataTransfer,
        bubbles: true
    });
    
    children.forEach(function (child) {
        child.focus();
        document.execCommand("selectall");
        child.dispatchEvent(event);
        // Trigger change event if there are change listeners attached
        const changeEvent = new Event('change', { bubbles: true });
        child.dispatchEvent(changeEvent);
    });
}

const showPopup = (title, content = '', allowAbort = false) => {
    let abortLink = '';
    if (allowAbort) {
        abortLink = `
            <a href="https://web.whatsapp.com/" class="btn btn-primary">
                <span><img src="${stopIcon}" alt="Stop Icon"></span> Abort Sending
            </a>
        `;
    }

    const html = `
        <div class="ak-logs-popup-body">
            <h2>${title}</h2>
            ${content ? `<div class="ak-logs-popup-content">${content}</div>` : ''}
            ${abortLink}
        </div>
    `;

    let popupContainer = document.querySelector('.ak-logs-popup-container')
    if ( ! popupContainer ) {
        popupContainer = document.createElement('div')
        popupContainer.classList.add('ak-logs-popup-container')
        popupContainer.innerHTML = html;
        document.querySelector('body').append(popupContainer)
    } else {
        popupContainer.innerHTML = html;
    }
    
    popupContainer.classList.add('active')
}

const hidePopup = (content) => {
    const popupContainer = document.querySelector('.ak-logs-popup-container')
    popupContainer.classList.remove('active')
}

const getDateAndTime = () => {
    const now = new Date();

    // Get date components
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month starts from 0
    const day = String(now.getDate()).padStart(2, '0');

    // Get time components
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    // Assemble the formatted date and time string
    const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
}

const sendMessage = text => {
    return new Promise(async (resolve, reject) => {
        try {

            // let el = document.querySelector('#main .copyable-area [contenteditable="true"][role="textbox"]')
            // if ( el ) {
            //     const dataTransfer = new DataTransfer();
            //     dataTransfer.setData('text', text);
            //     const event = new ClipboardEvent('paste', {
            //         clipboardData: dataTransfer,
            //         bubbles: true
            //     });
            
            //     document.execCommand("selectall");
            //     el.dispatchEvent(event)
            // }

            await waitForCondition(() => document.querySelector('[data-icon="send"]'), 500, 10);
            const sendBtn = document.querySelector('[data-icon="send"]');
            sendBtn.click();
            resolve({
                success: true
            });
        } catch (error) {
            reject(error);
        }
    });
}

const getRandomDelay = (min, max) => {
    min = parseInt(min)
    max = parseInt(max)
    if ( max <= min ) { // set max to greater than min if its less or equal
        max = min + DEFAULT_MIN_DELAY;
    }
    const randomDecimal = Math.random();
    const randomNumber = randomDecimal * (max - min) + min;
    return Math.floor(randomNumber);
}

const delay = ms => {
    return new Promise(resolve => setTimeout(resolve, parseInt(ms)));
}

function waitForCondition(callback, duration, tries, silent = false) {
    return new Promise((resolve, reject) => {
        let count = 0;
        const interval = setInterval(() => {
            if (callback()) {
                clearInterval(interval);
                resolve();
            } else if (count >= tries) {
                clearInterval(interval);
                if (!silent) {
                    reject(new Error(`Exceeded maximum tries (${tries}), ${callback}`));
                } else {
                    resolve(); // Resolve silently
                }
            }
            count++;
        }, duration);
    });
}

const openChat = async (phoneNumber, message) => {
    // console.log('opening chat');
    const link = document.createElement('a')
    // link.href = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
    link.href = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encodeURIComponent(message)}`
    link.style.display = 'none'
    body.append(link);
    link.addEventListener('click', (event) => {
        event.preventDefault();
    });
    link.click();
    // console.log('chat opened');

    await delay(2000); // wait for chat to open
    // console.log('we are here after some delay');
    
    return new Promise(async (resolve, reject) => {
        // if phone number is invalid then reject the request
        // const invalidPhoneBtnSelector = '[data-animate-modal-body="true"] .x889kno.x1a8lsjc.xbbxn1n.xxbr6pl.x1n2onr6.x1rg5ohu.xk50ysn.x1f6kntn.xyesn5m.x1z11no5.xjy5m1g.x1mnwbp6.x4pb5v6.x178xt8z.xm81vs4.xso031l.xy80clv.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x1v8p93f.xogb00i.x16stqrj.x1ftr3km.x1hl8ikr.xfagghw.x9dyr19.x9lcvmn.xbtce8p.x14v0smp.xo8ufso.xcjl5na.x1k3x3db.xuxw1ft.xv52azi';

        // await waitForCondition(() => document.querySelector(invalidPhoneBtnSelector), 200, 10, true);
        // const invalidPhoneNumberBtn = document.querySelector(invalidPhoneBtnSelector);
        // if (invalidPhoneNumberBtn) {
        //     invalidPhoneNumberBtn.click();
        //     reject({
        //         success: false,
        //         message: 'Invalid phone number'
        //     });
        // } else {
            resolve({ success: true, phone: phoneNumber });
        // }
    });
}

const sendMessages = async (messages, showLogs = true) => {
    let totalSent = 0;
    let totalFailed = 0;
    const logs = [];

    console.log(`Total messages to send ${messages.length}`);

    if ( showLogs ) {
        closeMainPopup();
        showPopup(`Total ${totalSent} of ${messages.length}`, '', true);
    } else {
        hidePopup();
    }

    for (let i = 0; i < messages.length; i++) {

        const { phoneNumber, message, sendAttachmentToMe } = messages[i];

        const minDelay = getMinDelay();
        const maxDelay = getMaxDelay();

        try {
            if ( i != 0 ) {
                await delay(getRandomDelay(minDelay, maxDelay));
            }
            openChat(phoneNumber, message)
            await sendMessage(message)

            if (sendAttachmentToMe) { // open attachment popup
                await waitForCondition(() => document.querySelector('[data-icon="attach-menu-plus"]').parentElement, 1000, 10);
                const openAttachmentMenuEl = document.querySelector('[data-icon="attach-menu-plus"]').parentElement;
                openAttachmentMenuEl.click();
                continue;
            }
            
            if (document.querySelector('#akAttachToggle').checked) {
                const loggedInPhoneNumber = getLoggedInPhoneNumber();

                if (loggedInPhoneNumber) {
                    await delay(getRandomDelay(minDelay, maxDelay));
                    openChat(loggedInPhoneNumber, '');
    
                    // forward attachment
                    await waitForCondition(() => document.querySelector('[data-icon="forward-chat"]'), 1000, 10);
                    const forwardChatElements = document.querySelectorAll('[data-icon="forward-chat"]');
                    
                    if (forwardChatElements.length > 0) {
                        const lastElement = forwardChatElements[forwardChatElements.length - 1];
                        lastElement.click();
                        
                        await waitForCondition(() => document.querySelector('[data-animate-modal-popup="true"] ._ai01'), 1000, 10);
                        simulatePasteEvent(document.querySelector('[data-animate-modal-popup="true"] ._ai01'), phoneNumber);

                        await waitForCondition(() => document.querySelector("div[data-animate-modal-body='true'] div[role='listitem'] div[role='checkbox']"), 1000, 10);
                        document.querySelectorAll("div[data-animate-modal-body='true'] div[role='listitem'] div[role='checkbox']")[0].click()

                        await waitForCondition(() => document.querySelector('.x1gfkgh9'), 1000, 10);
                        document.querySelector('.x1gfkgh9').click(); // send btn
                    }
                }

            }

            totalSent++;

            const logsObj = {
                phone: phoneNumber,
                message: message,
                status: 'Sent',
                time: getDateAndTime(),
            };

            logs.push(logsObj);
            
            if ( showLogs ) {
                saveLogs([logsObj]);
            }

            const abort = totalSent + totalFailed !== messages.length
            showPopup(`Sent ${totalSent}, Failed ${totalFailed} of ${messages.length}`, '', (totalSent + totalFailed !== messages.length));
        } catch (error) {
            totalFailed++;

            const logsObj = {
                phone: phoneNumber,
                message: message,
                status: 'Failed',
                time: getDateAndTime(),
            };

            logs.push(logsObj);
                    
            if ( showLogs ) {
                saveLogs([logsObj]);
            }

            console.error('An error occurred:', error);
            console.log(`Message Sent failed -- ${phoneNumber}`)
            showPopup(`Sent ${totalSent}, Failed ${totalFailed} of ${messages.length}`, '', (totalSent + totalFailed !== messages.length));
            continue;
        }
        console.log(`Message Sent -- ${phoneNumber}`)
    }
    await delay(2000);
    hidePopup();
}

const getCSVData = async () => {
    return new Promise((resolve, reject) => {
        const file = document.querySelector('#akCsvFile').files[0];
        if ( ! file ) {
            reject({
                success: false,
                message: 'No file found.'
            });
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const csv = e.target.result;
            let lines = csv.split(/\r?\n/);

            // remove empty filnes 
            lines = lines.filter(l => l.trim().length);

            lines = lines.map((line, i) => line.split(',').map(e => e.trim()))

            resolve({
                headers: lines[0],
                rows: lines.splice(1, lines.length),
            })
        };
        reader.readAsText(file);
    })
}

const replaceMessageVariables = (message, row) => {
    for (let key in row) {
        message = message.replaceAll(`{column_${parseInt(key) + 1}}`, row[key])
    }
    return message;
}

const getLoggedInPhoneNumber = () => {
    let phoneNumber;
    const o = JSON.parse(window.localStorage.getItem("last-wid"));
    const r = JSON.parse(window.localStorage.getItem("last-wid-md"));
    if (o) {
        phoneNumber = o.split("@")[0];
    } else if (r) {
        phoneNumber = r.split("@")[0].split(":")[0];
    }
    return phoneNumber;
}

const handleCSVColumnChange = (e, {headers, rows}) => {
    const selectedColumn = e.target.value;
    const csvFields = document.querySelector('#csvFields');
    let selectedPhoneNumbersDiv = csvFields.querySelector('#akSelectedPhoneNumbers');
    if (!selectedPhoneNumbersDiv) {
        selectedPhoneNumbersDiv = document.createElement('div');
        selectedPhoneNumbersDiv.id = 'akSelectedPhoneNumbers'
        csvFields.append(selectedPhoneNumbersDiv);
    }

    let html = '<ul>';
    const phoneNumbers = rows.map(row => row[selectedColumn]);

    phoneNumbers.forEach(phoneNumber => {
        html += `<li class="ak-selected-phone-number">${phoneNumber}</li>`;
    });

    html += '</ul>';

    html += `<div class="help-text">Selected phone number from uploaded CSV is shown above. Please review it for errors. <br>Phone numbers should be in 17133003000 or +17133003000 format. Country code in front.</div>`;

    selectedPhoneNumbersDiv.innerHTML = html;
}

const insertVariableToMessage = (e) => {
    if ( ! e.target.value ) {
        return;
    }
    const selectedColumn = parseInt(e.target.value);
    const messageField = document.querySelector('#akMessageCSV');
    const valueToInsert = `{column_${selectedColumn + 1}}`;

    // Get current cursor position
    const startPos = messageField.selectionStart;
    const endPos = messageField.selectionEnd;

    // Get the text before and after the insertion point
    const beforeValue = messageField.value.substring(0, startPos);
    const afterValue = messageField.value.substring(endPos, messageField.value.length);

    // Insert the value at the cursor position
    messageField.value = beforeValue + valueToInsert + afterValue;

    // Set the cursor position after the inserted value
    messageField.selectionStart = messageField.selectionEnd = startPos + valueToInsert.length;

    // Focus the message field to reflect the cursor position change
    messageField.focus();
    e.target.value = '';
}

const getCSVDropdownHTML = (headers, placeholder = false) => {
    let html = ``;
    if ( placeholder ) {
        html += `<option value="">${placeholder}</option>`
    }
    headers.forEach((header, index) => {
        html += `<option value="${index}">Column ${index+1} - ${header}</option>`;
    });
    return html;
}

const handleCsvInputChange = async (e) => {
    try {
        const data = await getCSVData()
        const headers = data.headers;
        const dropdownHtml = getCSVDropdownHTML(headers);

        const csvFields = document.querySelector('#csvFields');
        csvFields.innerHTML = '<label for="dynamicMessageField" class="form-label mb-3">Select column with phone numbers:</label>';

        const select = document.createElement('select');
        select.classList.add('form-control');
        select.id = 'akCsvFields';
        select.innerHTML = dropdownHtml;
        csvFields.appendChild(select);
        select.addEventListener('change', (e) => handleCSVColumnChange(e, data));
        select.dispatchEvent(new Event('change'));

        // Populate dynamic message fields select box
        const dynamicMessageFieldSelect = document.querySelector('#dynamicMessageField');
        dynamicMessageFieldSelect.innerHTML = dropdownHtml;
        dynamicMessageFieldSelect.selectedIndex = 0; // Set the default selected option

        // allow user to insert variables in message
        if ( document.querySelector('#akInsertVariableSelect') ) {
            document.querySelector('#akInsertVariableSelect').remove();
        }
        const messageField = document.querySelector('#akMessageCSV');
        const insertVariableSelect = document.createElement('select');
        insertVariableSelect.id = 'akInsertVariableSelect';
        insertVariableSelect.classList.add('form-control', 'mb-3')
        insertVariableSelect.innerHTML = getCSVDropdownHTML(headers, 'Insert variable');
        messageField.parentElement.insertBefore(insertVariableSelect, messageField);
        insertVariableSelect.addEventListener('change', insertVariableToMessage)
    } catch(error) {
        console.error(error)
    }
}

const getMinDelay = () => {
    const minDelay = parseInt(document.querySelector('#akMinDelay').value);
    return (minDelay < DEFAULT_MIN_DELAY ? DEFAULT_MIN_DELAY : minDelay)  * 1000;
}

const getMaxDelay = () => {
    const maxDelay = parseInt(document.querySelector('#akMaxDelay').value);
    return (maxDelay < DEFAULT_MAX_DELAY ? DEFAULT_MAX_DELAY : maxDelay)  * 1000;
}

const getInputPhoneNumbers = () => {
    const textarea = document.querySelector('#akPhoneNumber');
    const input = textarea.value;

    // Split the input by commas and newlines
    const phoneNumbers = input.split(/[\n,]+/).map(number => number.trim()).filter(number => number);

    // Return the phone numbers array
    return phoneNumbers;
}

const submitTextForm = () => {
    const phoneNumbersArray = getInputPhoneNumbers();
    const message = document.querySelector('#akMessageNumber').value;

    const payload = [];
    phoneNumbersArray.forEach(phoneNumber => {
        payload.push({
            phoneNumber: phoneNumber,
            message: message,
            minDelay: getMinDelay(),
            maxDelay: getMaxDelay(),
            sendAttachmentToMe: false
        })
    })

    sendMessages(payload);
}

const submitCSVForm = async () => {
    try {
        const data = await getCSVData()
        const headers = data.headers;
        const rows = data.rows;

        const phoneNumberFieldIndex = parseInt(document.querySelector('#akCsvFields').value);

        const useDynamicMessage = false; // document.querySelector('#dynamicMessageCheckbox').checked;
        const dynamicFieldIndex = useDynamicMessage ? parseInt(document.querySelector('#dynamicMessageField').value.slice(-1)) - 1 : null;
        const staticMessage = document.querySelector('#akMessageCSV').value;

        const payload = [];
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

            let currentMessage = useDynamicMessage ? (row[dynamicFieldIndex] || '') : staticMessage;
            const message = replaceMessageVariables(currentMessage, row);

            payload.push({
                phoneNumber: row[phoneNumberFieldIndex],
                message: message,
                sendAttachmentToMe: false
            })
        }

        sendMessages(payload)
    } catch (error) {
        console.error(error)
    }
}

const handleDynamicMessageFieldChange = () => {
    const selectBox = document.querySelector('#dynamicMessageSelectBox');
    const simpleMessageBox = document.querySelector('#simpleMessageField');
    if (document.querySelector('#dynamicMessageCheckbox').checked) {
        selectBox.style.display = 'block';
        simpleMessageBox.style.display = 'none';
    } else {
        selectBox.style.display = 'none';
        simpleMessageBox.style.display = 'block';
    }
}

const sendMessageToLoggedUser = () => {
    const loggedInPhoneNumber = getLoggedInPhoneNumber();
    if (! loggedInPhoneNumber) {
        return;
    }

    const message = 'Adding Attachment';

    const payload = [{
        phoneNumber: loggedInPhoneNumber,
        message: message,
        sendAttachmentToMe: true
    }];
    
    sendMessages(payload, false);
}

const saveMessage = (type) => {
    if ( type === 'csv' ) {
        const message = document.querySelector('#akMessageCSV').value;
        chrome.storage.local.set({ 'akWhatsappMessageCSV': message });
    } else {
        const message = document.querySelector('#akMessageNumber').value;
        chrome.storage.local.set({ 'akWhatsappMessageText': message });
    }
}

const setMessage = () => {
    chrome.storage.local.get('akWhatsappMessageText', result => {
        const message = result['akWhatsappMessageText'] || '';
        document.querySelector('#akMessageNumber').value = message;
    });

    chrome.storage.local.get('akWhatsappMessageCSV', result => {
        const message = result['akWhatsappMessageCSV'] || '';
        document.querySelector('#akMessageCSV').value = message;
    });
}

const saveLogs = (newLogs) => {
    // Retrieve existing logs from local storage using getLogs function
    getLogs((oldLogs) => {
        const mergedLogs = [...oldLogs, ...newLogs];
        chrome.storage.local.set({ 'akWhatsappLogs': mergedLogs });
    });
};

const getLogs = (callback) => {
    chrome.storage.local.get('akWhatsappLogs', (result) => {
        const logs = result['akWhatsappLogs'] || [];
        callback(logs);
    });
};

const exportLogs = () => {
    getLogs((logs) => {
        // Prepare CSV content
        const headerRow = ['Phone', 'Message', 'Status', 'Time'];

        const logRows = logs.map(log => {
            const message = log.message ? `"${log.message.replace(/"/g, '""')}"` : '';

            return [
                log.phone || '',
                message,
                log.status || '',
                log.time || ''
            ];
        });

        const csvRows = [headerRow, ...logRows];

        const csvContent = 'data:text/csv;charset=utf-8,' + 
            csvRows.map(row => row.join(',')).join('\n');

        // Create a virtual link element to trigger download
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', 'whatsapp_bot_logs.csv');
        document.body.appendChild(link);

        // Trigger download
        link.click();
    });
};

const deleteLogs = async () => {
    showPopup('Deleting report...')
    await delay(1000);
    chrome.storage.local.remove(["akWhatsappLogs"], async () => {
        if (chrome.runtime.lastError) {
            console.error(error);
            showPopup('Some error occurred.');
        } else {
            showPopup('Report deleted successfully.');
            await delay(2000);
        }
        hidePopup();
    })
}

function initializeEvents() {
    initializeTabs();

    document.querySelector('#akAttachToggle').addEventListener('change', () => {
        const sendAttachmentButton = document.querySelector('#akSendAttachment');
        sendAttachmentButton.style.display = document.querySelector('#akAttachToggle').checked ? 'block' : 'none';
    });

    document.querySelector('#akSendMessage').addEventListener('click', () => {
        const activeTab = document.querySelector('.ak-popup-container .nav-link.active');
        if ( activeTab.getAttribute('data-tab-target') === 'tab-send-number' ) {
            saveMessage('text');
            submitTextForm()
        } else {
            saveMessage('csv');
            submitCSVForm();
        }
    });

    popupCloseBtn.addEventListener('click', closeMainPopup);
    popupToggler.addEventListener('click', showMainPopup)
    // document.querySelector('#dynamicMessageCheckbox').addEventListener('change', handleDynamicMessageFieldChange);
    document.querySelector('#akSendAttachment').addEventListener('click', sendMessageToLoggedUser);
    document.querySelector('#akCsvFile').addEventListener('change', handleCsvInputChange);
    document.querySelector('#akDownloadReport').addEventListener('click', exportLogs);
    document.querySelector('#akDeleteReport').addEventListener('click', deleteLogs);

    setMessage();
}

initializeEvents();