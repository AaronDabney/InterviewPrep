function asTabs(tabPanel) {
    let buttons = [];

    for (let childNode of tabPanel.children) {
        let button = document.createElement('button');

        button.addEventListener('click', () => setActiveTab(tabPanel, childNode, button));
        button.innerText = childNode.getAttribute("data-tabname");

        buttons.unshift(button);
    }

    for (let button of buttons) {
        tabPanel.prepend(button);
    }

    function setActiveTab(tabPanel, target, button) {
        for (let child of tabPanel.children) {
            if (child.getAttribute("data-tabname")) {
                child.style.display = (child === target) ? '' : 'none'; 
            }

            if (child.tagName === 'BUTTON') {
                child.style.backgroundColor = (child === button) ? 'green' : 'red'; 
            }
        }
    }

    tabPanel.querySelector("button").click();
}

asTabs(document.querySelector("tab-panel"));
