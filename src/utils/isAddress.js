//import getWeb3 from './getWeb3'

const isChecksumAddress = (address) => {

    if (typeof window.web3 === 'undefined') return false;

    // Check each case
    address = address.replace('0x','');
    var addressHash = window.web3.sha3(address.toLowerCase());
    for (var i = 0; i < 40; i++ ) {
        // the nth letter should be uppercase if the nth digit of casemap is 1
        if ((parseInt(addressHash[i], 16) > 7 && address[i].toUpperCase() !== address[i]) || (parseInt(addressHash[i], 16) <= 7 && address[i].toLowerCase() !== address[i])) {
            return false;
        }
    }
    return true;
};



const isAddress = (address) => {
    // function isAddress(address) {
    if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
        // check if it has the basic requirements of an address
        return false;
    }  else if (/^(0x)?[0]{40}$/i.test(address)) {
        // zeros
        return false;
    } else if (/^(0x)?[0-9a-f]{40}$/.test(address) || /^(0x)?[0-9A-F]{40}$/.test(address)) {
        // If it's all small caps or all all caps, return "true
        return true;
    } else {
        // Otherwise check each case
        return isChecksumAddress(address);
    }
};


module.exports = {
    isChecksumAddress,
    isAddress
}