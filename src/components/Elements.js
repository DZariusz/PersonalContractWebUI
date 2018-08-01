import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip';
import { netAvatarStyle, getSimpleNetName} from "../utils/variables";




function Gravatar(props) {

    let s = Object.assign({}, netAvatarStyle(0), netAvatarStyle(props.netId))


    return (
        <Avatar
            id="contract-icon"
            style={s}>
        </Avatar>
    )

}


function NetNameChip(props) {

    return (
        <Chip label={getSimpleNetName(props.netId)} className={`MuiChip net-id-${props.netId}`} />
    )

}



export {
    Gravatar,
    NetNameChip
}