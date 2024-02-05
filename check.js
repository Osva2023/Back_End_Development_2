try {
    const fs = require('fs');
    console.log('Your Node.js version supports the require syntax.');
} catch (error) {
    console.log('Your Node.js version does not support the require syntax.');
}
