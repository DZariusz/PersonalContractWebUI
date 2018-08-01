
export const MAINNET_ID = 1
export const MORDEN_ID = 2
export const ROPSTEN_ID = 3
export const RINKEBY_ID = 4
export const KOVAN_ID = 42
export const TESTRPC_ID = 0



export const MAINNET_ADDR = '0x2eaf4bbdc530f4cb4724eadfffa82abd0e61f6b4'
export const ROPSTEN_ADDR = '0x3ce526b35f075305b6fdd5d67c5e46018572a331'

export const TESTRPC_ADDR = '0x0'



const netColors = (netId) => {

    switch (parseInt(netId, 10)) {
        //main
        case MAINNET_ID: return { color: '#29B6AF' }
        case MORDEN_ID: return { color: '#cfcfcf' }
        case ROPSTEN_ID: return { color: '#FF4A8D' }
        case RINKEBY_ID: return { color: '#F6C343' }
        case KOVAN_ID: return { color: '#7057FF' }
        default: return { color: '#999' }
    }
};



const getPredefinedAddress = (netId) => {

    switch(parseInt(netId, 10)) {
        //main
        case MAINNET_ID: return MAINNET_ADDR
        case ROPSTEN_ID: return ROPSTEN_ADDR
        case TESTRPC_ID: return TESTRPC_ADDR

        default: return false
    }
};



const netAvatarStyle = (netId) => {

    switch (parseInt(netId, 10)) {
        case MAINNET_ID:
            return {
                backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAADvklEQVR4Xu2dIW4bYRCFfzOHB7S4JwgI8gnKewCTwpwmsAcxLQmqqhyjBaWWwhwFFnq/J42e/BV3Zsdvvn0zXu9udj9fvlzW4L/HH5/Q0X99/4viaXB7/TsBYAgIANNvtQvYXr8OcOMAC4AAuAQSBhwBRL213AGGv8U4Am4cYAEQAHcAwoA7AFHPHWBNX8l0BNw4wAIgAO4AhAF3AKKeO4A7QPsZ1F7/7nw8jN4PML0FQwPD4RQgWoAAUAVhvAAMXwuH/cPhAiAAGCKSwBFA1AvE6gA6QACj7Sl0gO3aRSJ1AB0gAtLWJDrAVuVCcTqADhBCaVsaHWCbbrEoHUAHiMG0JZEOsEW1YIwOoAMEcbo+lQ5wvWbRCB1AB4gCdW2y8XsCv+4frq35v///7/kPiqfB90+fUYrT2yuKp8ECABUUACigDqADIIQcAUi+5Qhg+i1HABTQEeAIQAg5ApB8jgAm33IEUAEdAY4AxJAjAMnnCGDyOQKofssR4AhAEDkCkHyOACafI4Dq5wjw10B/DsZnEUiAfwuYvqNl+v0C7Z9fAMDZ8xEqAPAvfkD9x9+xIwACQBlG8XQEOgKQ/I6A+hkI+1//+XUASIA7gDsARIiFuwMMP1iiA+gA7BSG0TqADoAQcglE8vk1sP5rEOx//efXASABLoEugRAhFu4S6BKICMJvCGl/Ng6pFwievilWAAJNJCkEYPieONK8RKwACADiiN4W7whA8vNgHUAHQBTpAEi++WAdQAdAFOoASL75YB1AB0AU6gBIvvlgHUAHQBTqAEi++WAdQAdAFOoASL75YB1AB0AUYge4+/3tQiqgBZBjG8tfUbMTgG6M6A05AtDdf/yqWgEQAHeAZgYcAc3dC9QuAAERm1MIQHP3ArULQEDE5hQC0Ny9QO0CEBCxOYUANHcvULsABERsTiEAzd0L1C4AARGbUwhAc/cCtWMAzscDuh8g8BlMMagAfjh0sHYPHVBAAAIiNqcQgObuBWoXgICIzSkEoLl7gdoFICBicwoBaO5eoHYBCIjYnEIAmrsXqF0AAiI2pxCA5u4FaheAgIjNKQSguXuB2gUgIGJzCgFo7l6gdvxw6Am+4IG+IYMen2o4XT89vgBAAmgDKMD0+AIgAOzx8GmC6fFh/xc9A2n99Pg6ACSANkAA9g+oBVRAdPC1dADagOkzSADga+IEYNbB6AnkDgAtgDZg+gQSAAHwayBhQAfwUjDhZzkC/BqIAKIO5A6A5Pc6wLiFUQuF/fdCEG0AtTB6/FsH4B31VK/uOZ6UVgAAAABJRU5ErkJggg==)'
            }
        case ROPSTEN_ID:
            return {
                backgroundImage: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAADo0lEQVR4Xu3dvXEVQRRE4XkejuSRBxnIIwciwCICbIIgAhlkAJaKFJQFnuTgQeEQwJ6tujW1n/y7M+o507f37+3tx/O7P2vw783Xz2n03x+/pPpavPv8bwBoCACg6bd2F3D3+XOAiwMMAAAIgYUBLaCot5YMMHwWowVcHGAAAEAGKAzIAEU9GWBNX8nUAi4OMAAAIAMUBmSAop4MIAPsvoN2n//t56dv6XmAu/uH5AGvL0+pfjpFVwCm9QNAwq9fygYAB0gIVgflAEl+DrCmLUwGaBmKA3AAZwGFAWcBTgMLP+MtVAtIyycEjhMsBAqBcQ+3chlABkgETZ9GywBp+WQAGSC+3MoB3AtIHuRewPCLFduHQK+Hpw24/ZtNHgpt6w+AqN/2AtYWMH0hiwNEggFwcQEBAICkgBYQL6RMC8gBEv/9UioA2gIIgU2/7c9iAAAAL4cWBmSAop6XQ70cuvsO2n3+MsDFHQwAABACCwOXbwFVgCL+v9rdLwRN//+5BQCgffACAFEBDtC+mMIBIoC7OyAAANDOAnbfAXH9882gOn5tgRwgrsDuGwAAANACCgMcID7SVcR3IahfCNMCIoEcgANEhFq5s4DNXw5ty68FuBkUN4AMELegDCADRIRaec4A9XsBdQLt31ddHSj/SBQAZiEEwKz+46MDYHwJZicAgFn9x0cHwPgSzE4AALP6j48OgPElmJ0AAGb1Hx8dAONLMDsBAMzqPz46AMaXYHYCAJjVf3x0AIwvwewEADCr//joABhfgtkJZAB2/17ArPx99Onb6fmRsCpBJbiOP10PgOFHygDw3F4NqwJygPYDD1V/LaAqGOu1AC0gItTKOUDTL1dzAA6QISoH4ABFvRNqOQAHOAGj44fgAMe1O6WSA3CAU0A6ehAOcFS5k+o4AAc4CaVjh+EAx3Q7rYoDcIDTYDpyoOwAbx+/Hxn3f83ry1Oqn95B9WbW3f1D+v9/fXif6gGQ5OtfPgUAB0gIcoD4K1lJ/RO+e8gBOEBikANwgASQEJjkEwKX08D21TAZQAZIHiQDyAAJIBkgyScDyADxXoYMIAMkD5IBZIAEkAyQ5JMBZIDdM8Du3wuoF6KiAazag+v49XmE7b8XAIB2JRIAcQtygOEUzgE4QNzDrZwDcIBGUKwWAuNTyVF/ZwHTj2XLADJA3cSpXgaQARJAtVgGkAESQy4EJfmWECgEtnfzIn9LC9ACEkNaQJJPC1hawN4t4C9cJ2T9ZZxVNAAAAABJRU5ErkJggg=="
            }

        default:
            return {
                backgroundColor: '#fff',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                float: 'left',
                width: '30px',
                height: '30px',
                margin: '0 10px 0 0'
            }
    }
}


function getEtherscanUrl(address, netId) {

    switch (parseInt(netId, 10)) {

        case MAINNET_ID:
            return "https://etherscan.io/address/" + address;
        case ROPSTEN_ID:
            return "https://ropsten.etherscan.io/address/" + address;

        default:
            return false

    }
}

function getSimpleNetName(netId) {

    switch (parseInt(netId, 10)) {

        case MAINNET_ID:
            return "Main Ethereum Network";
        case MORDEN_ID:
            return "deprecated Morden Test Network";
        case ROPSTEN_ID:
            return "Ropsten Test Network";
        case RINKEBY_ID:
            return "Rinkeby Test Network";
        case KOVAN_ID:
            return "Kovan Test Network";
        default:
            return "TestRPC Network"

    }
}

export {
    netColors,
    netAvatarStyle,
    getSimpleNetName,
    getPredefinedAddress,
    getEtherscanUrl
}
