
window.bugReportextention = {
    screenshot: '',
    reports: [],
    dynamicDomFlow: false,
    currentProject: {},
    projects: [],
    selectedElement: '',
    selectedElementRect: '',
    currentElementInlineStyle: ''
};

chrome.runtime.onMessage.addListener(gotMessage);

async function gotMessage(message, sender, sendResponse) {
    /**
     * message: inject - turns on the extension and displays the extension UI.
     * Triggered on extention button click.
     *  */ 
     if (message === 'inject') {
        const extension = document.getElementsByTagName("ez-bug-ext")[0];
        if(extension) {
            const computedstyle = window.getComputedStyle(extension)
            if (computedstyle.display == 'none') {
                extension.style.display = 'block'
            } else {
                const closeBtn = document.getElementById('ui-br-ext-close-button');    
                closeBtn.click();  
            }
        } else {
            document.body.insertAdjacentHTML('beforeend', `<ez-bug-ext></ez-bug-ext>`);
        }
    }

    /**
     * message: triger_select
     * Key combo: Cntr-Shift-S
     * Triggers the onSelect() function, which enables element hover and selection (red outline).
     * Used for dynamic elements such as drop downs.
     */
    if (message == "trigger_select") {
        const selectBtn = document.getElementById('ui-br-ext-select-button');    
        selectBtn.click();     
    }

    /**
     * message: get_screenshot
     * Key combo: Cntr-Shift-U
     * Used to take screenshot of dynamic elements.
     */
    if (message == "get_screenshot") {
        window.selectButtonComponent.getScreenshot();
        // turn on report bug
    }

    if (message == "stop-video-recording") {
        console.log('turn video off');
        window.stopRecordButton.stopRecord();
    }
    sendResponse('success');
}