function GenericFBModel(gameName, changeCallbackFunction) {
    console.log('firebase loaded');
    this.boardName = gameName;
    this.db;
    this.callback = changeCallbackFunction;
    this.lastSend = null;
    this.initialize = function () {
        this.load();
    }
    this.load = function () {
        $.getScript('https://www.gstatic.com/firebasejs/3.6.8/firebase.js', this.start.bind(this));
    }
    this.start = function () {
        this.db = firebase;
        this.db.initializeApp(firebaseConfig);
        this.registerListener();
    }
    this.saveState = function (newState) {
        this.db.database().ref(this.boardName).set(newState);
    }
    this.registerListener = function () {
        this.db.database().ref(this.boardName).on('value', this.handleDataUpdate.bind(this));
    }
    this.handleDataUpdate = function (data) {
        var currentData = JSON.stringify(data.val());
        if (currentData != this.lastSend) {
            this.lastSend = JSON.stringify(currentData);
            this.callback.call(null, data.val());
            this.lastSend = JSON.stringify(currentData);
        }
    }
    this.initialize();
}

