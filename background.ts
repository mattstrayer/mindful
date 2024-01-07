

function test() {
    console.log('test')
}


chrome.tabs.onCreated.addListener(test)
