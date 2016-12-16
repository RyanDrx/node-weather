
var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            }
            else {
                reject('Arguments must be numbers!');
            }
        }, 1500);
    });
};

// var somePromise = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('Hey, Works!');
//         reject('ERROR, commence freakout!');
//     }, 2500);
// });

// somePromise.then((message) => {
//     console.log('Success!', message);
// }, (errorMessage) => {
//     console.log('Failed!', errorMessage);
// });

asyncAdd(7, 3).then((res) => {
    console.log('Result ', res);
    return asyncAdd(res, 15);
}).then((res) => {
    console.log('NEXT ', res);
}).catch((errorMessage)=>{
     console.log(errorMessage);
});