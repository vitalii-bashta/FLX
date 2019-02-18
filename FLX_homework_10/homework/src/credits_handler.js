let indexArr = [];
const maxCardKey = 3;

function userCard(index) {
    const taxedCreditsPercent = 0.005;
    const minCardKey = 1;
    const sliceBy = -2;

    let options = {
        balance: 100,
        transactionLimit: 100,
        historyLogs: [],
        key: index
    };

    function addHistoryLog(operationType, credits) {
        options.historyLogs.push({
            operationType: operationType,
            credits: credits,
            operationTime: getTime()
        });
    }

    function getTime() {
        let date = new Date();
        return ('0' + date.getDate()).slice(sliceBy) + '/' + ('0' + (date.getMonth() + 1)).slice(sliceBy) + '/' +
            date.getFullYear() + ', ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    }

    function checkIfOperationPossible(creditAmount) {
        if (options.balance < creditAmount) {
            console.error('Not enough funds!');
            return false;
        } else if (options.transactionLimit < creditAmount) {
            console.error('Transaction limit is too small!');
            return false;
        } else {
            return true;
        }
    }

    function checkIfIndexInvalid(key) {
        if (key < minCardKey || key > maxCardKey || indexArr.includes(key)) {
            console.error('Invalid index!');
            return true;
        } else {
            indexArr.push(key);
            return false;
        }
    }

    if (checkIfIndexInvalid(index)) {
        return
    }

    return {
        getCardOptions: function () {
            return options;
        },
        putCredits: function (creditAmount) {
            options.balance += creditAmount;
            addHistoryLog('Received credits', creditAmount);
        },
        takeCredits: function (creditAmount) {
            if (checkIfOperationPossible(creditAmount)) {
                options.balance -= creditAmount;
                addHistoryLog('Withdrawal of credits', creditAmount);
            }
        },
        setTransactionLimit: function (creditAmount) {
            options.transactionLimit = creditAmount;
            addHistoryLog('Transaction limit change', creditAmount);
        },
        transferCredits: function (creditAmount, card) {
            this.takeCredits(creditAmount * taxedCreditsPercent + creditAmount);
            card.putCredits(creditAmount);
        }
    }
}

function UserAccount(name) {
    this.name = name;
    this.cards = [];
    this.addCard = function () {
        if (this.cards.length > maxCardKey) {
            console.error('User already has 3 cards!');
            return
        }
        let newCard = userCard(this.cards.length + 1);
        this.cards.push(newCard);
    };
    this.getCardByKey = function (index) {
        return this.cards[index - 1]
    };
}