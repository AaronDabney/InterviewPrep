function asTabs(tabPanel) {
    const buttons = [];

    for (const childNode of tabPanel.children) {
        const button = document.createElement('button');

        button.addEventListener('click', () => setActiveTab(tabPanel, childNode, button));
        button.innerText = childNode.getAttribute("data-tabname");

        buttons.unshift(button);
    }

    for (const button of buttons) {
        tabPanel.prepend(button);
    }

    function setActiveTab(tabPanel, target, button) {
        for (const child of tabPanel.children) {
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
