let data = [{
        "_id": "5b5e3168c6bf40f2c1235cd6",
        "index": 0,
        "age": 39,
        "eyeColor": "green",
        "name": "Stein",
        "favoriteFruit": "apple"
    },
    {
        "_id": "5b5e3168e328c0d72e4f27d8",
        "index": 1,
        "age": 38,
        "eyeColor": "blue",
        "name": "Cortez",
        "favoriteFruit": "strawberry"
    },
    {
        "_id": "5b5e3168cc79132b631c666a",
        "index": 2,
        "age": 2,
        "eyeColor": "blue",
        "name": "Suzette",
        "favoriteFruit": "apple"
    },
    {
        "_id": "5b5e31682093adcc6cd0dde5",
        "index": 3,
        "age": 19,
        "eyeColor": "green",
        "name": "George",
        "favoriteFruit": "banana"
    }
];

function findTypes() {
    let types = [];
    for (let i = 0; i < arguments.length; i++) {
        types.push(typeof arguments[i]);
    }
    return types;
}
findTypes(null, 5, 'hello');

function executeForEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i]);
    }
}
executeForEach([1, 2, 3], function (el) {
    console.log(el)
});

function mapArray(arr, fn) {
    let transformedArr = [];

    executeForEach(arr, function (el) {
        transformedArr.push(fn(el))
    });

    return transformedArr;
}
mapArray([2, 5, 8], function (el) {
    return el + 3
});

function filterArray(arr, fn) {
    let transformedArr = [];

    executeForEach(arr, function (el) {
        if (fn(el)) {
            transformedArr.push(el)
        }
    });

    return transformedArr;
}
filterArray([2, 5, 8], function (el) {
    return el > 3
});

function getAmountOfAdultPeople(arr) {
    return filterArray(arr, function (param) {
        return param.age > 18;
    }).length;
}
getAmountOfAdultPeople(data);

function getGreenAdultBananaLovers(data) {
    let filteredArr = filterArray(data, function (param) {
        return param.age > 18 && param.favoriteFruit === 'banana' && param.eyeColor === 'green';
    });

    return mapArray(filteredArr, function (param) {
        return param.name;
    });
}
getGreenAdultBananaLovers(data);

function keys(obj) {
    let arr = [];
    for (let prop in obj) {
        arr.push(prop);
    }
    return arr;
}
keys({
    keyOne: 1,
    keyTwo: 2,
    keyThree: 3
});

function values(obj) {
    let arr = [];
    for (let prop in obj) {
        arr.push(obj[prop]);
    }
    return arr;
}
values({
    keyOne: 1,
    keyTwo: 2,
    keyThree: 3
});

function showFormattedDate(date) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return 'Date ' + date.getDate() + ' of ' + monthNames[date.getMonth()] + ' ' + date.getFullYear();
}
showFormattedDate(new Date('2019-01-27T01:10:00'));

function isEvenYear(date) {
    return !(date.getFullYear() % 2);
}
isEvenYear(new Date('2019-01-27T01:10:00'));


function isEvenMonth(date) {
    return !!(date.getMonth() % 2);
}
isEvenMonth(new Date('2019-02-27T01:10:00'));