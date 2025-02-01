(()=>{var e,a;{const o=document.querySelector("body"),n=2,t=4,r=(e=`
        <style>
            .ak-whatsapp-popup-toggler {
                border-radius: 50%;
                width: 50px;
                height: 50px;
                background: var(--button-primary-background);
                position: absolute;
                right: 20px;
                top: 20px;
                align-content: center;
                text-align: center;
                z-index: 999;
                cursor: pointer;
            }
            .ak-popup-container {
                position: fixed;
                background: white;
                right: 10px;
                top: 10px;
                z-index: 999;
                color: black;
                padding: 20px;
                box-sizing: border-box;
                font-family: 'open sans';
                border: 4px solid var(--button-primary-background);
                border-radius: 4px;
                background: #fff4f4;
                max-width: 400px;
                min-width: 400px;
            }
            .ak-popup-container *::selection {
                user-select: unset !important;
                background: var(--button-primary-background) !important;
            }
            .ak-popup-container h1 {
                font-size: 23px;
                margin-bottom: 20px;
                text-align: center;
                font-weight: bold;
            }
            .ak-popup-container .mb-3 {
                margin-bottom: 1rem;
            }
            .ak-popup-container .form-label {
                display: block;
                margin-bottom: 5px;
                font-weight: bold;
            }
            .ak-popup-container .form-control {
                width: 100%;
                padding: 7px 10px;
                border-radius: 4px;
                border: 2px solid var(--button-primary-background);
                box-sizing: border-box;
                background: white !important;
                color: #000 !important;
            }
            .ak-popup-container .form-control::placeholder {
                font-family: 'open sans';
                font-size: 16px;
            }
            .ak-popup-container textarea.form-control {
                min-height: 80px;
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
            .ak-popup-container .nav.nav-tabs li:first-child a {
                border-top-left-radius: 30px;
                border-bottom-left-radius: 30px;
            }
            .ak-popup-container .nav.nav-tabs li:last-child a {
                border-top-right-radius: 30px;
                border-bottom-right-radius: 30px;
            }
            .ak-popup-container .nav.nav-tabs li:not(:first-child):not(:last-child) a {
                border-left: 0;
                border-right: 0;
            }
            .ak-popup-container .nav.nav-tabs a {
                padding: 7px 10px;;
                border: 1px solid var(--button-primary-background);
                color: var(--button-primary-background);
                transition: 0.3s linear;
            }
            .ak-popup-container .nav.nav-tabs a.active,
            .ak-popup-container .nav.nav-tabs a:hover {
                background: var(--button-primary-background);
                color: white;
            }
            .ak-popup-container button.close {
                font-size: 25px;
                position: absolute;
                right: 10px;
                top: 0;
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
                background: rgb(0 168 132 / 70%);
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            .ak-logs-popup-container .ak-logs-popup-body h2 {
                font-size: 30px !important;
            }
            .ak-popup-container .btn-sm {
                padding: 7px 20px;
            }
        </style>
        <div class="ak-popup-container" style="display:none">
            <button type="button" class="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            <div class="container">
                <h1>Send WhatsApp Messages</h1>
                <ul class="nav nav-tabs">
                    <li class="nav-item">
                        <a class="nav-link active" href="#" data-tab-target="tab-send-number">Send Message</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-tab-target="tab-send-csv">Upload CSV</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" data-tab-target="tab-settings">Settings</a>
                    </li>
                </ul>
                <div class="tab-content active" id="tab-send-number">
                    <div class="mb-3">
                        <label for="akPhoneNumber" class="form-label">Phone numbers(separate with comma):</label>
                        <input type="text" id="akPhoneNumber" placeholder="Enter phone number(s)" class="form-control" value="">
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
                    <div class="mb-3">
                        <input type="checkbox" id="dynamicMessageCheckbox">
                        <label for="dynamicMessageCheckbox">Use Dynamic Message</label>
                    </div>
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
                    <div class="mb-3">
                        <input type="checkbox" id="akAttachToggle">
                        <label for="akAttachToggle">Add Attachment</label>
                    </div>
        
                    <div class="mb-3">
                        <button id="akSendAttachment" class="btn btn-secondary btn-sm">Attach Attachment</button>
                    </div>

                    <div class="row mb-3">
                        <div class="col">
                            <label for="akMinDelay" class="form-label">Min Delay (Seconds):</label>
                            <input type="number" id="akMinDelay" value="${n}" class="form-control" value="">
                        </div>
                        <div class="col">
                            <label for="akMaxDelay" class="form-label">Max Delay (Seconds):</label>
                            <input type="number" id="akMaxDelay" value="${t}" class="form-control" value="">
                        </div>
                    </div>

                    <button id="akSendMessage" class="btn btn-primary">Send Message</button>
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
        <div class="ak-whatsapp-popup-toggler">Bot</div>
        `,(a=document.createElement("div")).innerHTML=e,o.appendChild(a),document.querySelector(".ak-popup-container")),l=document.querySelector(".ak-whatsapp-popup-toggler"),s=document.querySelector(".ak-popup-container button.close"),c=()=>{r.style.display="block",l.style.display="none"},b=()=>{r.style.display="none",l.style.display=""},v=(e,a="")=>{e=`<div class="ak-logs-popup-body">
            <h2>${e}</h2>
            ${a?`
                <div class="ak-logs-popup-content">${a}</div>
            `:""}
        </div>`;let t=document.querySelector(".ak-logs-popup-container");t?t.innerHTML=e:((t=document.createElement("div")).classList.add("ak-logs-popup-container"),t.innerHTML=e,document.querySelector("body").append(t)),t.classList.add("active")},g=e=>{document.querySelector(".ak-logs-popup-container").classList.remove("active")},h=()=>{var e=new Date,a=e.getFullYear(),t=String(e.getMonth()+1).padStart(2,"0");return String(e.getDate()).padStart(2,"0")+`-${t}-${a} ${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}:`+String(e.getSeconds()).padStart(2,"0")},y=(e,a)=>{e=parseInt(e),(a=parseInt(a))<=e&&(a=e+n);var t=Math.random();return Math.floor(t*(a-e)+e)},k=a=>new Promise(e=>setTimeout(e,parseInt(a)));function m(n,r,l,s=!1){return new Promise((e,a)=>{let t=0;const o=setInterval(()=>{n()?(clearInterval(o),e()):t>=l&&(clearInterval(o),s?e():a(new Error(`Exceeded maximum tries (${l}), `+n))),t++},r)})}const f=async(t,e)=>{var a=document.createElement("a");return a.href=`https://api.whatsapp.com/send/?phone=${t}&text=`+encodeURIComponent(e),a.style.display="none",o.append(a),a.click(),await k(2e3),new Promise(async(e,a)=>{e({success:!0,phone:t})})},d=async(a,e=!0)=>{let t=0,o=0;var n,r=[];console.log("Total messages to send "+a.length),e?(b(),v(`Total ${t} of `+a.length)):g();for(let e=0;e<a.length;e++){var l,s,{phoneNumber:c,message:i,sendAttachmentToMe:d}=a[e],p=x(),u=w();try{if(0!=e&&await k(y(p,u)),f(c,i),await new Promise(async(e,a)=>{try{await m(()=>document.querySelector('[data-icon="send"]'),500,10),document.querySelector('[data-icon="send"]').click(),e({success:!0})}catch(e){a(e)}}),d){await m(()=>document.querySelector('[data-icon="attach-menu-plus"]').parentElement,1e3,10),document.querySelector('[data-icon="attach-menu-plus"]').parentElement.click();continue}document.querySelector("#akAttachToggle").checked&&(l=S())&&(await k(y(p,u)),f(l,""),await m(()=>document.querySelector('[data-icon="forward-chat"]'),1e3,10),0<(s=document.querySelectorAll('[data-icon="forward-chat"]')).length)&&(s[s.length-1].click(),await m(()=>document.querySelector('[data-animate-modal-popup="true"] ._ai01'),1e3,10),((e,a)=>{var e=e.querySelectorAll("*"),t=new DataTransfer;t.setData("text",a);const o=new ClipboardEvent("paste",{clipboardData:t,bubbles:!0});e.forEach(function(e){e.focus(),document.execCommand("selectall"),e.dispatchEvent(o);var a=new Event("change",{bubbles:!0});e.dispatchEvent(a)})})(document.querySelector('[data-animate-modal-popup="true"] ._ai01'),c),await m(()=>document.querySelector("div[data-animate-modal-body='true'] div[role='listitem'] div[role='checkbox']"),1e3,10),document.querySelectorAll("div[data-animate-modal-body='true'] div[role='listitem'] div[role='checkbox']")[0].click(),await m(()=>document.querySelector(".x1gfkgh9"),1e3,10),document.querySelector(".x1gfkgh9").click()),t++,r.push({phone:c,message:i,status:"Sent",time:h()}),v(`Sent ${t}, Failed ${o} of `+a.length)}catch(e){o++,r.push({phone:c,message:i,status:"Failed",time:h()}),console.error("An error occurred:",e),console.log("Message Sent failed -- "+c),v(`Sent ${t}, Failed ${o} of `+a.length);continue}console.log("Message Sent -- "+c)}await k(2e3),g(),e&&(n=r,E(e=>{e=[...e,...n];chrome.storage.local.set({akWhatsappLogs:e})}))},p=async()=>new Promise((t,e)=>{var a=document.querySelector("#akCsvFile").files[0],e=(a||e({success:!1,message:"No file found."}),new FileReader);e.onload=function(e){let a=e.target.result.split(/\r?\n/);a=(a=a.filter(e=>e.trim().length)).map((e,a)=>e.split(",").map(e=>e.trim())),t({headers:a[0],rows:a.splice(1,a.length)})},e.readAsText(a)}),u=(e,a)=>{for(var t in a)e=e.replaceAll(`{column_${parseInt(t)+1}}`,a[t]);return e},S=()=>{let e;var a=JSON.parse(window.localStorage.getItem("last-wid")),t=JSON.parse(window.localStorage.getItem("last-wid-md"));return a?e=a.split("@")[0]:t&&(e=t.split("@")[0].split(":")[0]),e},i=async e=>{try{var a=(await p()).headers,t=document.querySelector("#csvFields");t.innerHTML='<label for="dynamicMessageField" class="form-label mb-3">Select column with phone numbers:</label>';const o=document.createElement("select"),n=(o.classList.add("form-control"),o.id="akCsvFields",a.forEach((e,a)=>{var t=document.createElement("option");t.value=a,t.text=e,o.appendChild(t)}),t.appendChild(o),document.querySelector("#dynamicMessageField"));n.innerHTML="",a.forEach((e,a)=>{var t=document.createElement("option");t.value="column_"+(a+1),t.text=e,n.appendChild(t)}),n.selectedIndex=0}catch(e){console.error(e)}},x=()=>{var e=parseInt(document.querySelector("#akMinDelay").value);return 1e3*(e<n?n:e)},w=()=>{var e=parseInt(document.querySelector("#akMaxDelay").value);return 1e3*(e<t?t:e)},M=()=>{var e=document.querySelector("#dynamicMessageSelectBox"),a=document.querySelector("#simpleMessageField");document.querySelector("#dynamicMessageCheckbox").checked?(e.style.display="block",a.style.display="none"):(e.style.display="none",a.style.display="block")},q=()=>{var e=S();e&&(e=[{phoneNumber:e,message:"Adding Attachment",sendAttachmentToMe:!0}],d(e,!1))},E=a=>{chrome.storage.local.get("akWhatsappLogs",e=>{e=e.akWhatsappLogs||[];a(e)})},A=()=>{E(e=>{var e="data:text/csv;charset=utf-8,"+[["Phone","Message","Status","Time"],...e.map(e=>[e.phone||"",e.message||"",e.status||"",e.time||""])].map(e=>e.join(",")).join("\n"),e=encodeURI(e),a=document.createElement("a");a.setAttribute("href",e),a.setAttribute("download","whatsapp_bot_logs.csv"),document.body.appendChild(a),a.click()})},L=async()=>{v("Deleting report..."),await k(1e3),chrome.storage.local.remove(["akWhatsappLogs"],async()=>{chrome.runtime.lastError?(console.error(error),v("Some error occurred.")):(v("Report deleted successfully."),await k(2e3)),g()})};document.querySelectorAll("[data-tab-target]").forEach(t=>{t.addEventListener("click",()=>{var e=t.dataset.tabTarget,a=document.querySelector("#"+e),a=(document.querySelectorAll(".tab-content").forEach(e=>{e.classList.remove("active")}),a.classList.add("active"),document.querySelector(".common-fields"));"tab-settings"===e?a.classList.remove("active"):a.classList.add("active"),document.querySelectorAll(".nav-link").forEach(e=>{e.classList.remove("active")}),t.classList.add("active")})}),document.querySelector("#akAttachToggle").addEventListener("change",()=>{document.querySelector("#akSendAttachment").style.display=document.querySelector("#akAttachToggle").checked?"block":"none"}),document.querySelector("#akSendMessage").addEventListener("click",()=>{if("tab-send-number"===document.querySelector(".ak-popup-container .nav-link.active").getAttribute("data-tab-target")){var e=document.querySelector("#akPhoneNumber").value;const a=document.querySelector("#akMessageNumber").value;e=e.split(",").map(e=>e.trim());const t=[];e.forEach(e=>{t.push({phoneNumber:e,message:a,minDelay:x(),maxDelay:w(),sendAttachmentToMe:!1})}),d(t)}else(async()=>{try{var e=await p(),a=(e.headers,e.rows),t=parseInt(document.querySelector("#akCsvFields").value),o=document.querySelector("#dynamicMessageCheckbox").checked,n=o?parseInt(document.querySelector("#dynamicMessageField").value.slice(-1))-1:null,r=document.querySelector("#akMessageCSV").value,l=[];for(let e=0;e<a.length;e++){var s=a[e],c=o?s[n]||"":r,i=u(c,s);l.push({phoneNumber:s[t],message:i,sendAttachmentToMe:!1})}d(l)}catch(e){console.error(e)}})()}),s.addEventListener("click",b),l.addEventListener("click",c),document.querySelector("#dynamicMessageCheckbox").addEventListener("change",M),document.querySelector("#akSendAttachment").addEventListener("click",q),document.querySelector("#akCsvFile").addEventListener("change",i),document.querySelector("#akDownloadReport").addEventListener("click",A),document.querySelector("#akDeleteReport").addEventListener("click",L)}})();