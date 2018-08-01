export const isValidWeb3 = (web3) => {

    if (typeof web3 !== 'object') return false;
    //let check if we have valid web3 object, unfortunately, checking like ===null not working for some reason :/
    try {
        let allKeys = Object.keys(web3);
        if (allKeys.includes('eth')) return true;
    } catch(e) {
        //console.warn(e.toString())
    }

    return false;

}

